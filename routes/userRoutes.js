const router = require("express").Router();
const userController = require("../controllers/userController");
const articleCommentsController = require("../controllers/articleCommentsController");
const articleLikesController = require("../controllers/articleLikesController");
const userBookMarkController = require("../controllers/userBookMarkController");

// user data
router.get("/getCurrentUser", userController.getCurrentUser);

router.get("/profile", userController.getProfileData);
router.put("/profile", userController.updateUser);
router.delete("/profile", userController.deleteUser);

router.post("/beWritter", userController.beWritter);
router.put("/beWritter", userController.updateBeWritter);

// article comments
router.post("/articleComment", articleCommentsController.addArticleComment);
router.put("/articleComment", articleCommentsController.updateArticleComment);
router.delete(
  "/articleComment/:id",
  articleCommentsController.deleteArticleComment
);

// article likes
router.post("/articleLike", articleLikesController.addArticleLike);
router.put("/articleLike", articleLikesController.updateArticleLike);
router.delete("/articleLike/:id", articleLikesController.deleteArticleLike);

// book marks
router.get("/bookMarks", userBookMarkController.getUserBookMarks);
router.post("/bookMarks", userBookMarkController.addUserBookMark);
router.delete("/bookMarks/:id", userBookMarkController.deleteUserBookMark);

module.exports = router;
