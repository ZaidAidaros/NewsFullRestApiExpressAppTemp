const { ArticleLike } = require("../models");
const { Sequelize } = require("sequelize");

const addArticleLike = async (req, res) => {
  try {
    const articleLike = await ArticleLike.create({
      ...req.body,
      userId: req.user.Id,
    });
    res.status(200).json({
      state: true,
      message: "Like Added successfully",
      articleLike,
    });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      res.status(409).json({ state: false, message: "Already liked." });
    } else {
      res.status(500).json({ state: false, message: err.message });
    }
  }
};

const updateArticleLike = async (req, res) => {
  try {
    const result = await ArticleLike.update(
      { like: req.body.like },
      {
        where: {
          articleId: req.body.articleId,
          userId: req.user.Id,
        },
      }
    );
    if (result) {
      res.status(200).json({
        state: true,
        message: "Like updated successfully",
      });
    } else {
      res.status(404).json({ state: false, message: "Like not found" });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

const deleteArticleLike = async (req, res) => {
  try {
    const result = await ArticleLike.destroy({
      where: {
        articleId: Number.parseInt(req.params.id),
        userId: req.user.Id,
      },
    });
    if (result) {
      res.status(200).json({
        state: true,
        message: "Like deleted successfully",
      });
    } else {
      res.status(404).json({ state: false, message: "Like not found" });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

module.exports = { addArticleLike, updateArticleLike, deleteArticleLike };
