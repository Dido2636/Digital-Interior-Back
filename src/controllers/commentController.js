import Comment from "../models/commentModel";


export const getAllComment = async (req, res) => {
    try {
      const comment = await Comment.find();
      if (!comment) {
        return res.status(404).json("All comment not found");
      }
      res.json(comment);
    } catch (error) {
      console.error("Error fetching all comment ", error);
      res.status(500).json({ error: error.message });
    }
  };

  export const getCommentById = async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json("comment not found");
      }
      res.json(comment);
    } catch (error) {
      console.error("Error fetching comment by ID", error);
      res.status(500).json({ error: error.message });
    }
  };
  
