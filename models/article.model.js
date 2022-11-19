const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	id: String,
	userid: String,
	head: String,
	body: String,
});

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
