const express = require("express");
const ArticleController = require("../controllers/ArticleController");
const router = express.Router();
const articleController = new ArticleController();

router.get("/healthcheck", articleController.healthCheck);
router.get("/helloWorld", articleController.helloWorld);
router.get("/connectionInfo", articleController.connectionInfo);
router.get("/articles", articleController.getAllArticles);
router.get("/article/:id", articleController.getArticleById);
router.post("/articles", articleController.getArticlesByIds);
router.post("/article/:id/upvote", articleController.upvote);
router.post("/article/:id/comment", articleController.addComment);
router.delete("/article/:id/comments", articleController.deleteAllComments);

module.exports = router;
