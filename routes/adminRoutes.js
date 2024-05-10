const router = require("express").Router();
const adminController = require("../controllers/adminController");
const viste_msgController = require("../controllers/vister_msgController.js");
const articleCategoryController = require("../controllers/articleCategoryController");

router.get("/statictis", adminController.statictisReport);

router.get("/users", adminController.getUsers);
router.get("/users/search", adminController.usersSearch);
router.put("/users", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

router.get("/writters", adminController.getWritters);
router.get("/writters/search", adminController.writtersSearch);
router.get("/writters/articles", adminController.getWArticles);
router.put("/writters", adminController.updateWritter);
router.put("/writters/articles", adminController.updateWArticle);
router.delete("/writters/:id", adminController.deleteWritter);

router.get("/visters-msgs", viste_msgController.getVistersMsgs);
// router.get("/visters-msgs/:id", viste_msgController.getVisterMsg);
router.put("/visters-msgs/:id", viste_msgController.updateVisterMsg);
router.delete("/visters-msgs/:id", viste_msgController.deleteVisterMsg);

router.get(
  "/articles-categories",
  articleCategoryController.getArticleCategories
);

router.post(
  "/articles-categories",
  articleCategoryController.addArticleCategory
);
router.put(
  "/articles-categories",
  articleCategoryController.updateArticleCategory
);
router.delete(
  "/articles-categories/:id",
  articleCategoryController.deleteArticleCategory
);

module.exports = router;
