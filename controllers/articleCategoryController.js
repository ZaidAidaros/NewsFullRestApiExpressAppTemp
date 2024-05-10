const { ArticleCategory } = require("../models");
const { Sequelize } = require("sequelize");

const getArticleCategories = async (req, res) => {
  try {
    const categories = await ArticleCategory.findAll();
    res.status(200).json({ state: true, categories });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const getArticleCategory = async (req, res) => {
  try {
    const category = await ArticleCategory.findOne({
      where: { Id: req.params.id },
    });
    res.status(200).json({ state: true, category });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const addArticleCategory = async (req, res) => {
  try {
    await ArticleCategory.create(req.body);
    res
      .status(201)
      .json({ state: true, message: "Category Added Successfuly" });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      res
        .status(409)
        .json({ state: false, message: "Category name already exists." });
    } else {
      res.status(500).json({ state: false, message: err.message });
    }
  }
};

const updateArticleCategory = async (req, res) => {
  try {
    const resualt = await ArticleCategory.update(req.body, {
      where: { Id: req.body.Id },
    });
    if (resualt[0]) {
      res
        .status(200)
        .json({ state: true, message: "Category updated successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      res
        .status(409)
        .json({ state: false, message: "Post name already exists." });
    } else {
      res.status(500).json({ state: false, message: err.message });
    }
  }
};

const deleteArticleCategory = async (req, res) => {
  try {
    const result = await ArticleCategory.destroy({
      where: { Id: Number.parseInt(req.params.id) },
    });
    if (result) {
      res
        .status(200)
        .json({ state: true, message: "Post Comment deleted successfully" });
    } else {
      res.status(404).json({ state: false, message: "Post Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

module.exports = {
  getArticleCategories,
  getArticleCategory,
  addArticleCategory,
  updateArticleCategory,
  deleteArticleCategory,
};
