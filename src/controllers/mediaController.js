import Comment from "../models/commentModel";
import Media from "../models/mediaModel";

export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().populate("comments");
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
    const mediaId = req.params.id;
    const media = await Media.findById(mediaId).populate("comments");

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
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const mediaType = req.file.filename;
    // const mediaType = req.file ? req.file.path : null;
    const media = new Media({
      title,
      description,
      mediaType,
    });
    console.log(media)
    await media.save();
    console.log(media);
    res.status(200).json({ media, message: "Media created succesfully" });
  } catch (error) {
    console.error("Error Create Media", error);
    res.status(500).json(error.message);
  }
};

export const updateMedia = async (req, res) => {
  try {
    const mediaUpdate = await Media.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!mediaUpdate) {
      return res.status(404).json("Failed to update media");
    }

    res.json({ mediaUpdate, message: "Media Updated succesfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addCommentinMedia = async (req, res) => {
  try {
    const mediaId = req.params.mediaId;
    const media = await Media.findById(mediaId);

    if (!media) {
      return res.status(404).send("Error media not found");
    }

    const comment = new Comment({
      commentaire: req.body.commentaire,
      //mediaType,
      // author: req.user._id,
    });

    await comment.save();
    media.comments.push(comment);
    await media.save();

    const updatedMedia = await Media.findById(media).populate("comments");

    res.status(200).json(updatedMedia);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const media = await Media.findOne(mediaId);

    if (!media) {
      return res.status(404).json("Error media not found or not deleted");
    }

    await Media.findOneAndDelete(media).populate("comments");

    res.status(200).json({ message: "Media Deleted" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json(error.message);
  }
};

export const deleteCommentinMedia = async (req, res) => {
  try {
    const mediaId = req.params.mediaId;
    const commentId = req.params.commentId;
    const media = await Media.findById(mediaId);
    const comment = await Comment.findById(commentId);

    if (!media) {
      return res.status(404).json("Media not found ");
    }
    if (!comment) {
      return res.status(404).json("Comment not found ");
    }
    media.comments.pull(comment);
    await media.save();
    res.status(200).json({ media, message: "Comment Deleted" });
  } catch (error) {
    console.error("Error deleting comment", error);
    res.status(500).json({ error: error.message });
  }
};
