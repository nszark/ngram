'use strict';

const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/ngram');

const userSchema = new mongoose.Schema({
    id: String,
    fullName: String,
    username: String,
    hashedPassword: String
  });

const articleSchema = new mongoose.Schema({
    id: String,
    userid: String,
    head: String,
    body: String
});

const user = mongoose.model('user', userSchema);
const article = mongoose.model('article', articleSchema);

app.use(express.json());

app.get("/",(req,res) => {
    user.find({}, function (err, person) {
        if (err) return handleError(err);
        return res.status(200).send(person)})
})

app.get("/user/:id",(req,res) => {
    const idRequest = req.params["id"];

    user.find({id: idRequest}, function (err, person) {
        if (err) return handleError(err);
        return res.status(200).send(person)})
})

app.get("/article/:id",(req,res) => {
    const idRequest = req.params["id"];

    article.find({id: idRequest}, function (err, article) {
        if (err) return handleError(err);
        return res.status(200).send(article)})
})

app.post("/user/add",(req, res) => {
    const userRequest = req.body;

    const newUser = new user ({
        id: uuidv4(),
        fullName: userRequest["fullName"],
        username: userRequest["username"],
        hashedPassword: userRequest["hashedPassword"]
    });

    newUser.save(function (err) {
        if (err) return handleError(err);
        return res.status(200).send("Done!")})
})

app.put("/user/:id/update", (req,res) => {
    const userRequest = req.body;
    const idRequest = req.params["id"];

    user.updateOne({id: idRequest}, {
        fullName: userRequest["fullName"],
        username: userRequest["username"],
        hashedPassword: userRequest["hashedPassword"]
    }, function (err, person) {
        if (err) return handleError(err);
        return res.status(200).send(person)})
})

app.delete("/user/:id/delete", (req,res) => {
    const idRequest = req.params["id"];

    user.deleteOne({id: idRequest}, function (err, person) {
        if (err) return handleError(err);
        return res.status(200).send(person)})
})

app.post("/article/add", (req,res) => {
    const userRequest = req.body;

    const newArticle = new article ({
        id: uuidv4(),
        userid: userRequest["userid"],
        head: userRequest["head"],
        body: userRequest["body"]
    });

    newArticle.save(function (err) {
        if (err) return handleError(err);
        return res.status(200).send("Done!")})
})

app.put("/article/:articleid/update", (req,res) => {
    const userRequest = req.body;
    const idRequest = req.params["articleid"];

    article.updateOne({id: idRequest}, {
        userid: userRequest["userid"],
        head: userRequest["head"],
        body: userRequest["body"]
    }, function (err, article) {
        if (err) return handleError(err);
        return res.status(200).send(article)})
})

app.delete("/article/:articleid/delete", (req,res) => {
    const idRequest = req.params["articleid"];

    user.deleteOne({id: idRequest}, function (err, article) {
        if (err) return handleError(err);
        return res.status(200).send(article)})
})


app.listen(5000);