const monk = require("monk");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
console.log(process.env.MONGODB_CONNECTION_STRING);

const db = monk(process.env.MONGODB_CONNECTION_STRING);

const articles = JSON.parse(fs.readFileSync("./articles.json"));
// console.log(articles);
const articleCol = db.get("articles");

for (let article of articles) {
  //   console.log(article);
  articleCol.insert(article).then(p => {
    console.log(p);
  });
}
