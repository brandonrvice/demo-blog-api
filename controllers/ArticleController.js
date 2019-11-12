import ArticleRepository from "./ArticleRepository";
import LoggingController from "./LoggingController";

const log = new LoggingController();

class ArticleController {
  async upvote(req, res) {
    try {
      const articleRepository = new ArticleRepository();
      const { id } = req.params;
      const upvotes = await articleRepository.upvote(id);
      res.status(200).send(upvotes);
    } catch (err) {
      log.error(err);
      res.status(500).send({ message: "A system error occurred.", error: err.message });
    }
  }

  async getArticleById(req, res) {
    try {
      const articleRepository = new ArticleRepository();
      const { id } = req.params;
      let article = await articleRepository.getArticleById(id);
      if (article === undefined) {
        res.sendStatus(404);
      } else {
        res.status(200).send(article);
      }
    } catch (err) {
      log.error(err);
      res.status(500).send({ message: "A system error occurred.", error: err.message });
    }
  }

  async getAllArticles(req, res) {
    try {
      const articleRepository = new ArticleRepository();
      const articles = await articleRepository.getAllArticles();
      res.status(200).send(articles);
    } catch (err) {
      log.error(err);
      res.status(500).send({ message: "A system error occurred.", error: err.message });
    }
  }

  async getArticlesByIds(req, res) {
    try {
      const articleRepository = new ArticleRepository();
      const articleIds = req.body;
      const articles = [];
      for (let id of articleIds) {
        let article = await articleRepository.getArticleById(id);
        articles.push(article);
      }
      res.status(200).send(articles);
    } catch (err) {
      log.error(err);
      res.status(500).send({ message: "A system error occurred.", error: err.message });
    }
  }

  async addComment(req, res) {
    try {
      const { username, text } = req.body;
      const { id } = req.params;
      const articleRepository = new ArticleRepository();
      const comments = await articleRepository.addComment(id, { username, text });
      res.status(200).send(comments);
    } catch (err) {
      log.error(err);
      res.status(500).send({ message: "A system error occurred.", error: err.message });
    }
  }

  async deleteAllComments(req, res) {
    try {
      const { id } = req.params;
      const articleRepository = new ArticleRepository();
      await articleRepository.deleteAllComments(id);
      res.sendStatus(200);
    } catch (err) {
      log.error(err);
      res.status(500).send({ message: "A system error occurred.", error: err.message });
    }
  }
}

export default ArticleController;
