import Comment from "../models/commentModel";
import Decorator from "../models/decoratorModel";
import Media from "../models/mediaModel";
import Project from "../models/projectModel";
import User from "../models/userModel";

// Create a new project
export const createProject = async (req, res) => {
  const { title, description, email, author } = req.body;
  // const decoratorId = req.params.decoratorId;
  // const author = await Decorator.findById(decoratorId);
  // const author = req.user.id
  
  try {
    // Assume que l'utilisateur actuel est le propriétaire du projet
    const project = new Project({
      title: title,
      description: description,
      author : author,
      invitedUsers: [email],
    });
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all projects owned by the current user
export const getAllProject = async (req, res) => {
  try {
    // const projects = await Project.find({ owner: req.user._id });
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addUserinProject = async (req, res) => {
  try {
    // Recherche du projet
    const project = await Project.findOne({ _id: req.params.id });

    // Vérification de l'existence du projet
    if (!project) {
      return res.status(404).send("Project not found or you are not the owner");
    }

    // Vérification de l'existence de l'utilisateur dans la base de données
    const email = req.body.email; // Assurez-vous que l'e-mail est envoyé dans le corps de la demande
    const existingUser = await User.findOne({ email });

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!existingUser) {
      return res.status(400).send("Cet utilisateur n'existe pas dans la base de données");
    }

    // Ajout de l'utilisateur au projet
    project.invitedUsers.push({ email, userId: existingUser._id });

    // Ajout du projet à la liste des projets invités de l'utilisateur
    existingUser.invitedProjects.push(project._id);

    // Sauvegarde des modifications dans la base de données
    await project.save();
    await existingUser.save();

    // Réponse à la demande avec le projet et l'e-mail de l'utilisateur
    res.send({ project, userEmail: email });
  } catch (error) {
    // Gestion des erreurs
    res.status(400).send(error);
  }
};


// export const addUserinProject = async (req, res) => {
//   try {
//     const project = await Project.findOne({
//       _id: req.params.id,
//       // owner: req.user._id, // Assurez-vous que l'utilisateur actuel est le propriétaire du projet
//     });
//     const userId = req.body.userId;
//     const user = await User.findById(userId);
//     if (!project) {
//       return res.status(404).send("Project not found or you are not the owner");
//     }
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     project.invitedUsers.push(userId); // Ajoutez l'ID de l'utilisateur au tableau invitedUsers
//     await project.save();
//     res.send(project);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

export const getAllMediaInProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send("Projet non trouvé");
    }

    const allMedia = await Media.find({ project: projectId });

    res.status(200).json(allMedia);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des médias du projet",
        error: error.message,
      });
  }
};

export const addMediainProject = async (req, res) => {
  try {
    const { title, description, sousDescription, viewUrl } = req.body;

    // Vérifiez que req.params.id contient l'ID du projet
    if (!req.params.id) {
      return res.status(400).send("Error: Project ID is missing");
    }

    // Assurez-vous d'importer le modèle Project
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).send("Error: Project not found");
    }

    // Vérifiez que req.file contient le fichier à télécharger
    const imageMedia = req.file.filename;

    // Créez une instance de Media avec les données fournies
    const postMedia = new Media({
      title,
      description,
      sousDescription,
      imageMedia,
      viewUrl,
    });

    // Sauvegardez le nouveau média
    await postMedia.save();

    // Ajoutez le média au projet et sauvegardez le projet
    project.media.push(postMedia);
    await project.save();

    // Récupérez le projet mis à jour pour le renvoyer en réponse
    const updatedProject = await Project.findById(req.params.id);

    // Renvoyez le projet mis à jour en tant que réponse
    res.status(200).json(updatedProject);
  } catch (error) {
    // Gérez les erreurs et renvoyez un message d'erreur approprié
    res.status(500).json({ error: error.message });
  }
};

// export const addMediainProject = async (req, res) => {
//   try {
//     const { title, description, sousDescription, viewUrl } = req.body;
//     const project = await Project.findById({ _id: req.params.id });
//     if (!project) {
//       return res.status(404).send("Error project not found");
//     }

//     const imageMedia = req.file.filename;

//     const postMedia = new Media({
//       title,
//       description,
//       sousDescription,
//       imageMedia,
//       viewUrl,
//     });

//     console.log(postMedia);

//     await postMedia.save();
//     project.media.push(postMedia);
//     await project.save();

//     const updatedProject = await Project.findById(project);

//     res.status(200).json(updatedProject);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

export const addCommentinMediainProject = async (req, res) => {
  try {
    // 1. Recherche du projet
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Error project not found");
    }

    // 2. Recherche du média
    const media = await Media.findById(req.params.mediaId);
    if (!media) {
      return res.status(404).send("Error media not found");
    }

    // 3. Extraction des données du commentaire
    const { commentaire } = req.body;

    // 4. Création du commentaire
    const comment = new Comment({
      commentaire: commentaire,
    });

    // 5. Sauvegarde du commentaire
    await comment.save();

    project.media.commentaire.push(comment);
    await project.save();

    // 7. Renvoi du média mis à jour
    const updatedMedia = await Media.findById(media).populate("commentaire");
    res.status(200).json(updatedMedia);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Update a project by ID (owner only)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a project by ID (owner only)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      //   owner: req.user._id,
    });
    if (!project) {
      return res.status(404).send();
    }
    res.status(200).json({ message: "Project Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
