const {
  User,
  Writter,
  Article,
  ArticleCategory,
  ArticleComment,
  ArticleLike,
} = require("../models");
const {
  addArticle,
  updateArticle,
  deleteArticle,
  articleImgMiddleWare,
} = require("./articlesController");

const getWritterProfile = async (req, res) => {
  try {
    const writter = await Writter.findOne({ where: { userId: req.user.Id } });
    const user = req.user;
    delete user.iat;
    delete user.exp;
    res.status(200).json({ state: true, user, writter: writter.toJson() });
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};
const getWritterArticles = async (req, res) => {
  try {
    console.log(req.query);
    const published = req.query.published === "true" ? true : false;
    const page = Number.parseInt(req.query.page);
    const configSelect = {
      where: { writterId: req.user.writterId, published },
      order: [["updatedAt", "DESC"]],
      offset: page * 15,
      limit: 15,
      include: [
        {
          model: ArticleCategory,
          attributes: ["name"],
        },
        {
          model: ArticleComment,
          attributes: ["Id", "comment", "updatedAt"],
        },
        {
          model: ArticleLike,
        },
      ],
    };
    console.log("****", page);
    if (page) {
      console.log("****", page);
      const articles = await Article.findAll(configSelect);
      res.status(200).json({ state: true, articles });
    } else {
      console.log("****", page);
      const { count, rows } = await Article.findAndCountAll(configSelect);
      res.status(200).json({ state: true, articles: rows, count });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

module.exports = {
  getWritterProfile,
  getWritterArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  articleImgMiddleWare,
};
