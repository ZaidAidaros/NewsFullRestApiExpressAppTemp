const { Article } = require("../models");
const multer = require("multer");
const path = require("path");

const articleImgStorage = multer.diskStorage({
  destination: function (req, img, cb) {
    const dest =
      path.dirname(__dirname) +
      path.sep +
      "public" +
      path.sep +
      "articles_images";
    return cb(null, dest);
  },
  filename: function (req, img, cb) {
    const art = JSON.parse(req.body.article);

    const imgName =
      art.title + "_" + Date.now() + path.extname(img.originalname);
    req.body.article = art;
    return cb(null, imgName);
  },
});

const articleImgMiddleWare = multer({
  storage: articleImgStorage,
}).single("img");

const addArticle = async (req, res) => {
  try {
    let image = "";
    let article = null;
    if (req.file) {
      image = "articles-imgs/" + req.file.filename;
      article = req.body.article;
    } else {
      article = JSON.parse(req.body.article);
    }
    const published = article.published && !req.user.isWritterStoped;
    console.log(article);
    await Article.create({
      ...article,
      image,
      published,
      writterId: req.user.writterId,
    });

    res
      .status(201)
      .json({ state: true, message: "The Article Saved Successfuly .." });
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    let article = null;
    if (req.file) {
      article = req.body.article;
      article.image = "articles-imgs/" + req.file.filename;
    } else {
      article = JSON.parse(req.body.article);
    }

    const published = article.published && !req.user.isWritterStoped;
    const resualt = await Article.update(
      { ...article, published, writterId: req.user.writterId },
      {
        where: {
          published: false,
          Id: Number.parseInt(req.params.id),
          writterId: req.user.writterId,
        },
      }
    );

    if (resualt[0]) {
      res.status(200).json({
        state: true,
        message: "The Article Updated Successfully",
      });
    } else {
      res.status(404).json({
        state: false,
        message: "Article not found or is published",
      });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const result = await Article.destroy({
      where: {
        published: false,
        Id: Number.parseInt(req.params.id),
        writterId: req.user.writterId,
      },
    });
    if (result) {
      res
        .status(200)
        .json({ state: true, message: "The Article Deleted Successfully" });
    } else {
      res.status(404).json({
        state: false,
        message: "Article not found or is published",
      });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

module.exports = {
  addArticle,
  updateArticle,
  deleteArticle,
  articleImgMiddleWare,
};
