const { ArticleComment } = require("../models");

const addArticleComment = async (req, res) => {
  try {
    const comment = await ArticleComment.create({
      ...req.body,
      userId: req.user.Id,
    });
    res
      .status(201)
      .json({ state: true, message: "Comment added successfully", comment });
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

const updateArticleComment = async (req, res) => {
  try {
    const { Id, comment } = req.body;
    const resualt = await ArticleComment.update(
      { comment },
      {
        where: { Id, userId: req.user.Id },
      }
    );
    if (resualt[0]) {
      res
        .status(200)
        .json({ state: true, message: "Comment updated successfully" });
    } else {
      res.status(404).json({ state: false, message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

const deleteArticleComment = async (req, res) => {
  try {
    const result = await ArticleComment.destroy({
      where: {
        Id: Number.parseInt(req.params.id),
        userId: Number.parseInt(req.user.Id),
      },
    });
    if (result) {
      res.status(200).json({
        state: true,
        message: "Comment deleted successfully",
      });
    } else {
      res.status(404).json({ state: false, message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

module.exports = {
  addArticleComment,
  updateArticleComment,
  deleteArticleComment,
};
