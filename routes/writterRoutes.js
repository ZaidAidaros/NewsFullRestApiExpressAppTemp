const router = require("express").Router();
// const multer = require("multer");

// const articleImgDisk = multer.diskStorage({
//   destination: "../public/articles_images/temp/",
// });

const {
  getWritterProfile,
  getWritterArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  articleImgMiddleWare,
} = require("../controllers/writterConteroller");

router.get("/profile", getWritterProfile);
router.get("/w-articles", getWritterArticles);
// router.get("/w-articles/:id", getWritterArticles);
router.post("/article", articleImgMiddleWare, addArticle);
router.put("/article/:id", articleImgMiddleWare, updateArticle);
router.delete("/article/:id", deleteArticle);

module.exports = router;
