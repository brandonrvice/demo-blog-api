import MongoController from "./MongoController";

class ArticleRepository {
  async getArticleById(id) {
    const db = await MongoController.getDb("my_blog");
    const article = await db.collection("article-data").findOne({ id: id });
    return article;
  }

  async getAllArticles() {
    const db = await MongoController.getDb("my_blog");
    const articles = await db
      .collection("article-data")
      .find({})
      .toArray();
    return articles;
  }

  async addComment(id, comment) {
    const db = await MongoController.getDb("my_blog");
    await db.collection("article-data").updateOne({ id: id }, { $push: { comments: comment } });
    const comments = await db
      .collection("article-data")
      .findOne({ id: id }, { projection: { comments: 1 } });
    return comments;
  }

  async deleteAllComments(id) {
    const db = await MongoController.getDb("my_blog");
    await db.collection("article-data").updateOne({ id: id }, { $set: { comments: [] } });
  }

  async upvote(id) {
    const db = await MongoController.getDb("my_blog");
    await db.collection("article-data").update({ id: id }, { $inc: { upvotes: 1 } });

    const upvotes = await db
      .collection("article-data")
      .findOne({ id: id }, { projection: { upvotes: 1 } });

    console.log(upvotes);
    return upvotes;
  }
}

export default ArticleRepository;
