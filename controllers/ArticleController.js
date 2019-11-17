const ArticleRepository = require("./ArticleRepository");
const LoggingController = require("./LoggingController");

const log = new LoggingController();

class ArticleController {
  constructor() {
    this.healthCheck = this.healthCheck.bind(this);
    this.upvote = this.upvote.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteAllComments = this.deleteAllComments.bind(this);
    this.getAllArticles = this.getAllArticles.bind(this);
    this.getArticleById = this.getArticleById.bind(this);
    this.getArticlesByIds = this.getArticlesByIds.bind(this);
  }

  async withRepository(operations, res) {
    try {
      const articleRepository = new ArticleRepository();
      await operations(articleRepository);
    } catch (err) {
      log.error(err);
      res.status(500).send({ message: "A system error occurred.", error: err.message });
    }
  }

  async healthCheck(_, res) {
    this.withRepository(async repository => {
      const count = await repository.healthCheck();
      res.status(200).send({ count: count });
    }, res);
  }

  async helloWorld(_, res) {
    res.status(200).send("Hello back, my fine friend!");
  }

  async connectionInfo(_, res) {
    res.status(200).send(process.env.MONGODB_CONNECTION_STRING);
  }

  async upvote(req, res) {
    this.withRepository(async repository => {
      const { id } = req.params;
      const upvotes = await repository.upvote(id);
      res.status(200).send(upvotes);
    }, res);
  }

  async getArticleById(req, res) {
    this.withRepository(async repository => {
      const { id } = req.params;
      let article = await repository.getArticleById(id);
      if (article === undefined) {
        res.sendStatus(404);
      } else {
        res.status(200).send(article);
      }
    }, res);
  }

  async getAllArticles(_, res) {
    this.withRepository(async repository => {
      const articles = await repository.getAllArticles();
      res.status(200).send(articles);
    }, res);
  }

  async getArticlesByIds(req, res) {
    this.withRepository(async repository => {
      const articleIds = req.body;
      const articles = [];
      for (let id of articleIds) {
        let article = await repository.getArticleById(id);
        articles.push(article);
      }
      res.status(200).send(articles);
    }, res);
  }

  async addComment(req, res) {
    this.withRepository(async repository => {
      const { username, text } = req.body;
      const { id } = req.params;
      const comments = await repository.addComment(id, { username, text });
      res.status(200).send(comments);
    }, res);
  }

  async deleteAllComments(req, res) {
    this.withRepository(async repository => {
      const { id } = req.params;
      await repository.deleteAllComments(id);
      res.sendStatus(200);
    }, res);
  }
}

module.exports = ArticleController;
