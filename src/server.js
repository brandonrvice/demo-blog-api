import express from "express";
import bodyParser from "body-parser";
import articleData from "./article-data.json";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/articles/:id/upvote", (req, res) => {
  const article = articleData.find(p => p.id === req.params.id);
  article.upVote = article.upVote === undefined ? 1 : ++article.upVote;
  res.status(200).send({
    id: article.id,
    upVote: article.upVote
  });
});

app.get("/api/article/:id", (req, res) => {
  let article = articleData.find(p => p.id === req.params.id);
  if (article === undefined) {
    res.sendStatus(404);
  } else {
    res.status(200).send(article);
  }
});

app.get("/api/articles", (req, res) => {
  res.status(200).send(articleData);
});

app.post("/api/articles", (req, res) => {
  const articles = [];
  for (let id of req.body) {
    articles.push(articleData.find(p => p.id === id));
  }
  res.status(200).send(articles);
});

app.listen(8000, () => console.log("Listening on port 8000."));
