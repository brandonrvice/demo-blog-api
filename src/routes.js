import express from "express";
import ArticleController from "../controllers/ArticleController";

const router = express.Router();
const articleController = new ArticleController();
router.get("/articles", articleController.getAllArticles);
router.get("/article/:id", articleController.getArticleById);
router.post("/articles", articleController.getArticlesByIds);
router.post("/article/:id/upvote", articleController.upvote);
router.post("/article/:id/comment", articleController.addComment);
router.delete("/article/:id/comments", articleController.deleteAllComments);

export default router;
