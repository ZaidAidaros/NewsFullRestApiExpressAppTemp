const router = require("express").Router();
const homeController = require("../controllers/homeController");
const {
  getArticleCategories,
} = require("../controllers/articleCategoryController");

router.get("/articles-categories", getArticleCategories);

router.get("/articles", homeController.getCategArticles);
router.get("/articles/search", homeController.search);
router.get("/articles/:id", homeController.getArticleById);

router.get("/articles-comments", homeController.getArticleComments);

router.post("/feedback", homeController.feedback);

module.exports = router;
