const {
  User,
  Writter,
  Article,
  ArticleComment,
  ArticleLike,
  UserBookMark
} = require("../models");
const { addVisterMsg } = require("./vister_msgController.js");
const { Op } = require("sequelize");
// const { Sequelize } = require("sequelize");

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({
      where: { Id: Number.parseInt(req.params.id), published: true },
      include: [
        {
          model: Writter,
          attributes: [["nickName", "name"]],
        },
        {
          model: ArticleLike,
          attributes: ["Id", "like", "userId"],
        },
      ],
    });
    res.status(200).json({ state: true, article });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const search = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page);
    const categoryId = Number.parseInt(req.query.categoryId);
    const sVal = String(req.query.sVal);
    const selectCondion = {
      where: {
        articleCategoryId: categoryId,
        published: true,
        [Op.or]: [
          {
            title: { [Op.substring]: sVal },
          },
          {
            shortContent: { [Op.substring]: sVal },
          },
          {
            content: { [Op.substring]: sVal },
          },
        ],
      },
      order: [["updatedAt", "DESC"]],
      offset: page * 15,
      limit: 15,
      include: [
        {
          model: Writter,
          attributes: [["nickName", "name"]],
        },
        {
          model: ArticleLike,
          attributes: ["Id", "like", "userId"],
        },
      ],
    };
    if (page) {
      const articles = await Article.findAll(selectCondion);
      res.status(200).json({ state: true, articles });
    } else {
      const { count, rows } = await Article.findAndCountAll(selectCondion);
      const pageCount = Number.parseInt(count / 15) + 1;
      res.status(200).json({ state: true, articles: rows, count, pageCount });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const getCategArticles = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page);
    const categoryId = Number.parseInt(req.query.categoryId);
    const selectCondion = {
      where: {
        articleCategoryId: categoryId,
        published: true,
        isStoped: false,
      },
      order: [["updatedAt", "DESC"]],
      offset: page * 15,
      limit: 15,
      include: [
        {
          model: Writter,
          attributes: [["nickName", "name"]],
        },
        {
          model: ArticleLike,
          attributes: ["Id", "like", "userId"],
          //include: [{ model: User, attributes: [["UName", "name"]] }],
        },
        {
          model: UserBookMark,
          attributes: ["Id", "userId"],
        },
      ],
    };
    if (page) {
      const articles = await Article.findAll(selectCondion);
      res.status(200).json({ state: true, articles });
    } else {
      const { count, rows } = await Article.findAndCountAll(selectCondion);
      const pageCount = Number.parseInt(count / 15) + 1;
      res.status(200).json({ state: true, articles: rows, count, pageCount });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const getArticleComments = async (req, res) => {
  try {
    const { page, articleId } = req.query;
    const comments = await ArticleComment.findAll({
      where: {
        articleId: Number.parseInt(articleId),
      },
      order: ["updatedAt"],
      offset: page * 15,
      limit: 15,
      include: [
        {
          model: User,
          attributes: [["UName", "name"]],
        },
      ],
    });
    res.status(200).json({ state: true, comments });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const feedback = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (cookies.isFeedbackSent) {
    res.status(202).json({
      state: false,
      message: "You are already sent feedback today",
    });
  } else {
    addVisterMsg(req, res);
  }
};

module.exports = {
  getCategArticles,
  search,
  getArticleById,
  getArticleComments,
  feedback,
};
