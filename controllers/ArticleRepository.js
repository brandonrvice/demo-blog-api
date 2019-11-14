import MongoController from "./MongoController";

class ArticleRepository {
  constructor() {
    this.upvote = this.upvote.bind(this);
    this.getAllArticles = this.getAllArticles.bind(this);
    this.getArticleById = this.getArticleById.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteAllComments = this.deleteAllComments.bind(this);
    this.mongo = new MongoController("demo-blog", "articles");
  }

  async healthCheck() {
    return await this.mongo.withCollection(async col => {
      return await col.countDocuments();
    });
  }

  async getArticleById(id) {
    return await this.mongo.withCollection(async col => {
      return await col.findOne({ id: id });
    });
  }

  async getAllArticles() {
    return await this.mongo.withCollection(async col => {
      return await col.find({}).toArray();
    });
  }

  async addComment(id, comment) {
    return await this.mongo.withCollection(async col => {
      await col.updateOne({ id: id }, { $push: { comments: comment } });
      return col.findOne({ id: id }, { projection: { comments: 1 } });
    });
  }

  async deleteAllComments(id) {
    await this.mongo.withCollection(async col => {
      await col.updateOne({ id: id }, { $set: { comments: [] } });
    });
  }

  async upvote(id) {
    return await this.mongo.withCollection(async col => {
      await col.updateOne({ id: id }, { $inc: { upvotes: 1 } });
      return await col.findOne({ id: id }, { projection: { upvotes: 1 } });
    });
  }
}

export default ArticleRepository;
