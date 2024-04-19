import Comment from "../models/commentModel";
import Media from "../models/mediaModel";
import path from "path";
import fs from "fs";

export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().populate("commentaire");
    if (!media) {
      return res.status(404).json("All media not found");
    }
    res.json(media);
  } catch (error) {
    console.error("Error fetching all media ", error);
    res.status(500).json({ error: error.message });
  }
};

export const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById({ _id: req.params.id }).populate(
      "commentaire"
    );

    if (!media) {
      return res.status(404).json("media not found");
    }
    res.json(media);
  } catch (error) {
    console.error("Error fetching media by ID", error);
    res.status(500).json({ error: error.message });
  }
};

export const createMedia = async (req, res) => {
  const isAdmin = req.user.isAdmin;
  console.log(isAdmin);
  try {
    if (isAdmin) {
      const { title, description, sousDescription, viewUrl } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const imageMedia = req.file.filename;
      const createAt = new Date();

      const media = new Media({
        title,
        description,
        sousDescription,
        imageMedia,
        viewUrl,
        createAt,
      });
      console.log(media);
      await media.save();
      console.log(media);
      res.status(200).json({ media, message: "Media created succesfully" });
    } else {
      res.status(401).send("Non autorisé");
    }
  } catch (error) {
    console.error("Error Create Media", error);
    res.status(500).json(error.message);
  }
};

export const updateMedia = async (req, res) => {
  const isAdmin = req.user.isAdmin;
  console.log(isAdmin);
  try {
    if (isAdmin) {
      const mediaUpdate = await Media.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!mediaUpdate) {
        return res.status(404).json("Failed to update media");
      }
      res.json({ mediaUpdate, message: "Media Updated succesfully" });
    } else {
      res.status(401).send("Non autorisé");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addCommentinMedia = async (req, res) => {
  try {
    const media = await Media.findById({ _id: req.params.mediaId });
    if (!media) {
      return res.status(404).send("Error media not found");
    }

    const { commentaire, createAt } = req.body;
    const author = req.user.firstname;

    const comment = new Comment({
      commentaire: commentaire,
      author: author,
      createAt: createAt,
    });

    console.log(comment);

    await comment.save();
    media.commentaire.push(comment);
    await media.save();

    const updatedMedia = await Media.findById(media).populate("commentaire");

    res.status(200).json(updatedMedia);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteMedia = async (req, res) => {
  const isAdmin = req.user.isAdmin;
  console.log(isAdmin);
  try {
    if (isAdmin) {
      const mediaId = req.params.id;
      const media = await Media.findOne({ _id: mediaId });
      if (!media) {
        return res
          .status(404)
          .json({ error: "Media not found or not deleted" });
      }

      if (media.imageMedia) {
        const imagePath = path.join(process.cwd(), "uploads", media.imageMedia);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await Media.findOneAndDelete({ _id: mediaId });

      res.status(200).json({ message: "Media Deleted" });
    } else {
      res.status(401).send("Non autorisé");
    }
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteCommentInMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.media);
    const comment = await Comment.findById(req.params.comment);

    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    media.commentaire.pull(comment._id);
    await media.save();

    res.status(200).json({ media, message: "Comment Deleted" });
  } catch (error) {
    console.error("Error deleting comment", error);
    res.status(500).json({ error: error.message });
  }
};

// export const addCommentinMedia = async (req, res) => {
//   try {
//     const media = await Media.findById({ _id: req.params.mediaId });
//     const { commentaire, author } = req.body;
//     if (!media) {
//       return res.status(404).send("Error media not found");
//     }
//     let user = await User.findById(author);
//     console.log(user);

//     const comment = new Comment({
//       commentaire: commentaire,
//       author: user._id, // Stockez uniquement l'ID de l'auteur
//       authorFirstName: user.firstname, // Stockez le prénom de l'auteur
//     });

//     await comment.save();
//     media.commentaire.push(comment);
//     await media.save();

//     const updatedMedia = await Media.findById(media).populate("commentaire");

//     res.status(200).json(updatedMedia);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

// export const deleteMedia = async (req, res) => {
//   try {
//     const media = await Media.findOneAndDelete({ _id: req.params.id });

//     if (!media) {
//       return res.status(404).json("Error media not found or not deleted");
//     }

//     // Supprimer l'image associée
//     if (media.imageMedia) {
//       const imagePath = path.join(process.cwd(), "uploads", media.imageMedia);
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//       }
//     }

//     // Supprimer le fichier PDF associé s'il existe
//     if (media.pdfMedia) {
//       const pdfPath = path.join(process.cwd(), "uploads", media.pdfMedia);
//       if (fs.existsSync(pdfPath)) {
//         fs.unlinkSync(pdfPath);
//       }
//     }

//     res.status(200).json({ message: "Media and associated files deleted" });
//   } catch (error) {
//     console.error("Error deleting media:", error);
//     res.status(500).json(error.message);
//   }
// };
