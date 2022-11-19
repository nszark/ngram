const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();

function handleError(err) {
  return err;
}

mongoose.connect('mongodb://0.0.0.0:27017/ngram');

const userSchema = new mongoose.Schema({
  id: String,
  fullName: String,
  username: String,
  hashedPassword: String,
});

const articleSchema = new mongoose.Schema({
  id: String,
  userid: String,
  head: String,
  body: String,
});

const User = mongoose.model('user', userSchema);
const Article = mongoose.model('article', articleSchema);

require('./config/routes')(app);

app.use(express.json());

app.get('/', (req, res) => {
  User.find({}, (err, person) => {
    if (err) return handleError(err);
    return res.status(200).send(person);
  });
});

app.get('/user/:id', (req, res) => {
  const idRequest = req.params.id;

  User.find({ id: idRequest }, (err, person) => {
    if (err) return handleError(err);
    return res.status(200).send(person);
  });
});

app.get('/article/:id', (req, res) => {
  const idRequest = req.params.id;
  Article.find({ id: idRequest }, (err, articlePost) => {
    if (err) return handleError(err);
    return res.status(200).send(articlePost);
  });
});

app.post('/user/add', (req, res) => {
  const userRequest = req.body;
  const newUser = new User({
    id: uuidv4(),
    fullName: userRequest.fullName,
    username: userRequest.username,
    hashedPassword: userRequest.hashedPassword,
  });
  newUser.save((err) => {
    if (err) return handleError(err);
    return res.status(200).send('Done!');
  });
});

app.put('/user/:id/update', (req, res) => {
  const userRequest = req.body;
  const idRequest = req.params.id;
  User.updateOne({ id: idRequest }, {
    fullName: userRequest.fullName,
    username: userRequest.username,
    hashedPassword: userRequest.hashedPassword,
  }, (err, person) => {
    if (err) return handleError(err);
    return res.status(200).send(person);
  });
});

app.delete('/user/:id/delete', (req, res) => {
  const idRequest = req.params.id;
  User.deleteOne({ id: idRequest }, (err, person) => {
    if (err) return handleError(err);
    return res.status(200).send(person);
  });
});

app.listen(5000);
