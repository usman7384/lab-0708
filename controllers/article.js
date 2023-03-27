const Router = require("express").Router();
const Article = require("../models/article");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Get all articles
Router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get specific article
Router.get("/:articleId", async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        res.json(article);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete specific article
Router.delete("/:articleId", async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    try {
        const removedArticle = await Article.remove( { _id: req.params.articleId });
        res.json(removedArticle);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update specific article
Router.put("/:articleId", async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    try {
        const updatedArticle = await Article.updateOne(
            { _id: req.params.articleId },
            {
                $set: {
                    title: req.body.title,
                    author: req.body.author,
                    body: req.body.body,
                    tags: req.body.tags,
                    published: req.body.published,
                },
            }
            );
            res.json(updatedArticle);
        } catch (err) {
            res.json({ message: err });
        }
    });
    
    // Create new article
    Router.post("/", async (req, res) => {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        if (!req.token || !decodedToken.id) {
          return res.status(401).json({ error: "token missing or invalid" });
        }
        const user = await User.findById(decodedToken.id);
        const article = new Article({
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
            tags: req.body.tags,
            published: false,
            user: user._id,
        });
        try {
            const savedArticle = await article.save();
            user.articles = user.articles.concat(savedArticle._id);
            await user.save();
            res.json(savedArticle);
        } catch (err) {
            res.json({ message: err });
        }
    });
    
    module.exports = Router;
    