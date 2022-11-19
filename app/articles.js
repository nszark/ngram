const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Article = mongoose.model('article');

function handleError(err) {
  return err;
}

exports.new = async (req, res) => {
  const userRequest = req.body;
  console.log(userRequest);
  const newArticle = new Article({
    id: uuidv4(),
  });
  newArticle.save((err) => {
    if (err) return handleError(err);
    return res.status(200).send('Done!');
  });
};

exports.edit = async (req, res) => {
  const userRequest = req.body;
  const idRequest = req.params.articleid;
  Article.updateOne({ id: idRequest }, {
    userid: userRequest.userid,
    head: userRequest.head,
    body: userRequest.body,
  }, (err, articlePost) => {
    if (err) return handleError(err);
    return res.status(200).send(articlePost);
  });
};

exports.delete = async (req, res) => {
  const idRequest = req.params.articleid;
  Article.deleteOne({ id: idRequest }, (err, articlePost) => {
    if (err) return handleError(err);
    return res.status(200).send(articlePost);
  });
};
