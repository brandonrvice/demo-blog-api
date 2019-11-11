import ArticleRepository from "./ArticleRepository";

class ArticleController {
  async upvote(req, res) {
    const articleRepository = new ArticleRepository();
    const { id } = req.params;
    const upvotes = await articleRepository.upvote(id);
    res.status(200).send(upvotes);
  }

  async getArticleById(req, res) {
    const articleRepository = new ArticleRepository();
    const { id } = req.params;
    let article = await articleRepository.getArticleById(id);
    if (article === undefined) {
      res.sendStatus(404);
    } else {
      res.status(200).send(article);
    }
  }

  async getAllArticles(req, res) {
    const articleRepository = new ArticleRepository();
    const articles = await articleRepository.getAllArticles();
    res.status(200).send(articles);
  }

  async getArticlesByIds(req, res) {
    const articleRepository = new ArticleRepository();
    const articleIds = req.body;
    const articles = [];
    for (let id of articleIds) {
      let article = await articleRepository.getArticleById(id);
      articles.push(article);
    }
    res.status(200).send(articles);
  }

  async addComment(req, res) {
    const { username, text } = req.body;
    const { id } = req.params;
    const articleRepository = new ArticleRepository();
    const comments = await articleRepository.addComment(id, { username, text });
    res.status(200).send(comments);
  }

  async deleteAllComments(req, res) {
    const { id } = req.params;
    const articleRepository = new ArticleRepository();
    await articleRepository.deleteAllComments(id);
    res.sendStatus(200);
  }
}

export default ArticleController;
