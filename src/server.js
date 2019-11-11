import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ArticleController from "../controllers/ArticleController";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const articleController = new ArticleController();
app.get("/api/articles", articleController.getAllArticles);
app.get("/api/article/:id", articleController.getArticleById);
app.post("/api/articles", articleController.getArticlesByIds);
app.post("/api/article/:id/upvote", articleController.upvote);
app.post("/api/article/:id/comment", articleController.addComment);
app.delete("/api/article/:id/comments", articleController.deleteAllComments);

app.listen(8000, () => console.log("Listening on port 8000."));
