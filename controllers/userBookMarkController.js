const { 
  UserBookMark, 
  Article, 
  Writter,
  ArticleComment,
  ArticleLike
} = require("../models");

const getUserBookMarks = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page);
    conditions = {
      where: { userId: req.user.Id },
      order: [["updatedAt", "DESC"]],
      offset: page * 15,
      limit: 15,
      include: [
        {
          model: Article,
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
        },
      ],
    };

    if (page) {
      const userBookMarks = await UserBookMark.findAll(conditions);
      res.status(200).json({ state: true, userBookMarks });
    } else {
      const { count, rows } = await UserBookMark.findAndCountAll(conditions);
      const pageCount = Number.parseInt(count / 15) + 1;
      res.status(200).json({ state: true, userBookMarks: rows, count, pageCount });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const addUserBookMark = async (req, res) => {
  try {
    const userBookMark = await UserBookMark.create({userId: req.user.Id,articleId:req.body.articleId});
    res
      .status(201)
      .json({ state: true, message: "Book Mark Added Successfuly", userBookMark});
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};
const deleteUserBookMark = async (req, res) => {
  try {
    const result = await UserBookMark.destroy({
      where: { Id: Number.parseInt(req.params.id), userId: req.user.Id },
    });
    if (result) {
      res
        .status(200)
        .json({ state: true, message: "Book Mark Deleted Successfully" });
    } else {
      res.status(404).json({ state: false, message: "Book Mark Not Found" });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

module.exports = { getUserBookMarks, addUserBookMark, deleteUserBookMark };
