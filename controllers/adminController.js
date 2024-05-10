const db = require("../models");
const { Op } = require("sequelize");

const statictisReport = async (req, res) => {
  try {
    const statictisInfo = {
      usersCount: await db.User.count(),
      writtersCount: await db.Writter.count(),
      articlesCount: await db.Article.count(),
      likesCount: await db.ArticleLike.count(),
      commentsCount: await db.ArticleComment.count(),
    };
    res.status(200).json({ state: true, statictisInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ state: true, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const isStoped = req.query.isStoped === "true" ? true : false;
    const page = Number.parseInt(req.query.page);
    const where = {
      where: {
        isStoped,
        Id: { [Op.not]: req.user.Id },
      },
      attributes: [
        "Id",
        ["UName", "name"],
        "email",
        "phone",
        "isEmailVerified",
        "isPhoneVerified",
        "isStoped",
        "createdAt",
        "updatedAt",
      ],
      order: [["updatedAt", "DESC"]],
      offset: req.query.page * 20,
      limit: 20,
      include: [
        {
          model: db.UserPermission,
        },
      ],
    };
    if (page) {
      const users = await db.User.findAll(where);
      res.status(200).json({ state: true, users, count });
    } else {
      const { count, rows } = await db.User.findAndCountAll(where);
      res.status(200).json({ state: true, users: rows, count });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const usersSearch = async (req, res) => {
  try {
    const isStoped = req.query.isStoped === "true" ? true : false;
    const sVal = String(req.query.sVal);
    const page = Number.parseInt(req.query.page);
    const where = {
      where: {
        isStoped,
        Id: { [Op.not]: req.user.Id },
        [Op.or]: [
          {
            UName: { [Op.substring]: sVal },
          },
          {
            email: { [Op.substring]: sVal },
          },
          {
            phone: { [Op.substring]: sVal },
          },
        ],
      },
      attributes: [
        "Id",
        ["UName", "name"],
        "email",
        "phone",
        "isEmailVerified",
        "isPhoneVerified",
        "isStoped",
        "createdAt",
        "updatedAt",
      ],
      order: [["updatedAt", "DESC"]],
      offset: page * 20,
      limit: 20,
      include: [
        {
          model: db.UserPermission,
        },
      ],
    };
    if (page) {
      const users = await db.User.findAll(where);
      res.status(200).json({ state: true, users, count });
    } else {
      const { count, rows } = await db.User.findAndCountAll(where);
      res.status(200).json({ state: true, users: rows, count });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const resualt = await db.User.update(req.body, {
      where: { Id: req.body.Id },
    });
    if (resualt[0]) {
      res
        .status(200)
        .json({ state: true, message: "User Updated Successfully.." });
    } else {
      res
        .status(400)
        .json({ state: false, message: "some thing went wrong.." });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const resualt = await db.User.distroy({
      where: { Id: req.params.id },
    });
    if (resualt) {
      res
        .status(200)
        .json({ state: true, message: "User Deleted Successfully" });
    } else {
      res.status(400).json({ state: true, message: "Some thing went wrong.." });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const getWritters = async (req, res) => {
  try {
    const { isApproved, page } = req.query;
    let isApprove = null;
    const isStoped = req.query.isStoped === "true" ? true : false;
    if (isApproved) {
      isApprove = isApproved === "true" ? true : false;
    }
    if (Number.parseInt(page)) {
      const writters = await db.Writter.findAll({
        where: { isApproved: isApprove, isStoped },
        order: [["updatedAt", "DESC"]],
        offset: page * 20,
        limit: 20,
      });
      res.status(200).json({ state: true, writters });
    } else {
      const { count, rows } = await db.Writter.findAndCountAll({
        where: { isApproved: isApprove, isStoped },
        order: [["updatedAt", "DESC"]],
        offset: 0,
        limit: 20,
      });
      res.status(200).json({ state: true, writters: rows, count });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const writtersSearch = async (req, res) => {
  try {
    const sVal = String(req.query.sVal);
    const { isApproved, page } = req.query;
    let isApprove = null;
    const isStoped = req.query.isStoped === "true" ? true : false;
    if (isApproved) {
      isApprove = isApproved === "true" ? true : false;
    }
    const where = {
      where: {
        isApproved: isApprove,
        isStoped,
        [Op.or]: [
          {
            firstName: { [Op.substring]: sVal },
          },
          {
            middelName: { [Op.substring]: sVal },
          },
          {
            lastName: { [Op.substring]: sVal },
          },
          {
            familyName: { [Op.substring]: sVal },
          },
          {
            nickName: { [Op.substring]: sVal },
          },
          {
            nic: { [Op.substring]: sVal },
          },
          {
            address: { [Op.substring]: sVal },
          },
        ],
      },
      order: [["updatedAt", "DESC"]],
      offset: page * 20,
      limit: 20,
    };
    if (Number.parseInt(page)) {
      const writters = await db.Writter.findAll(where);
      res.status(200).json({ state: true, writters });
    } else {
      const { count, rows } = await db.Writter.findAndCountAll(where);
      res.status(200).json({ state: true, writters: rows, count });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const getWArticles = async (req, res) => {
  try {
    const { writterId, page } = req.query;
    const isStoped = req.query.isStoped === "true" ? true : false;
    if (Number.parseInt(page)) {
      const articles = await db.Article.findAll({
        where: { writterId: Number.parseInt(writterId), isStoped },
        order: [["updatedAt", "DESC"]],
        offset: page * 15,
        limit: 15,
        include: [
          {
            model: db.ArticleCategory,
            attributes: ["name"],
          },
          {
            model: db.ArticleComment,
            attributes: ["Id", "comment", "updatedAt"],
          },
          {
            model: db.ArticleLike,
          },
        ],
      });
      res.status(200).json({ state: true, articles });
    } else {
      const { count, rows } = await db.Article.findAndCountAll({
        where: { writterId, isStoped },
        order: [["updatedAt", "DESC"]],
        offset: 0,
        limit: 15,
        include: [
          {
            model: db.ArticleCategory,
            attributes: ["name"],
          },
          {
            model: db.ArticleComment,
            attributes: ["Id", "comment", "updatedAt"],
          },
          {
            model: db.ArticleLike,
          },
        ],
      });
      res.status(200).json({ state: true, articles: rows, count });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

const updateWritter = async (req, res) => {
  try {
    const { Id, userId } = req.body;
    delete req.body.userId;
    delete req.body.Id;
    console.log(req.body);
    if (req.body.isApproved || req.body.isStoped) {
      req.body.notification = null;
    }
    let resualt = await db.Writter.update(req.body, { where: { Id } });
    if (resualt[0]) {
      if (req.body.isApproved) {
        resualt = await db.User.update(
          { userPermissionId: 2 },
          { where: { Id: userId } }
        );
      }
    }

    if (resualt[0]) {
      res
        .status(200)
        .json({ state: true, message: "Writter Updated Successfully" });
    } else {
      res.status(400).json({ state: false, message: "some thing went wrong" });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const updateWArticle = async (req, res) => {
  try {
    const { Id, isStoped } = req.body;
    console.log(req.body);
    const resualt = await db.Article.update({ isStoped }, { where: { Id } });
    if (resualt[0]) {
      res
        .status(200)
        .json({ state: true, message: "Article Updated Successfully" });
    } else {
      res.status(400).json({ state: false, message: "some thing went wrong" });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const deleteWritter = async (req, res) => {
  try {
    const resualt = await db.Writter.distroy({
      where: { Id: req.params.id, isApproved: false },
    });
    if (resualt) {
      res
        .status(200)
        .json({ state: true, message: "Writter Deleted Successfully" });
    } else {
      res.status(400).json({ state: true, message: "Some thing went wrong.." });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

module.exports = {
  statictisReport,
  getUsers,
  usersSearch,
  updateUser,
  deleteUser,
  getWritters,
  writtersSearch,
  getWArticles,
  updateWritter,
  updateWArticle,
  deleteWritter,
};
