const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
});



const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
