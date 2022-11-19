const { v4: uuidv4 } = require('uuid');
const Article = require('../models/article.model');

function handleError(err) {
  return err;
}

const create = async (req, res) => {
  const userRequest = req.body;
  const newArticle = new Article({
    id: uuidv4(),
    userid: userRequest.userid,
    head: userRequest.head,
    body: userRequest.body,
  });
  newArticle.save((err) => {
    if (err) return handleError(err);
    return res.status(200).send('Done!');
  });
};

const edit = async (req, res) => {
  const userRequest = req.body;
  const idRequest = req.params.articleid;
  Article.updateOne(
    { id: idRequest },
    {
      userid: userRequest.userid,
      head: userRequest.head,
      body: userRequest.body,
    },
    (err, articlePost) => {
      if (err) return handleError(err);
      return res.status(200).send(articlePost);
    },
  );
};

const remove = async (req, res) => {
  const idRequest = req.params.articleid;
  Article.deleteOne({ id: idRequest }, (err, articlePost) => {
    if (err) return handleError(err);
    return res.status(200).send(articlePost);
  });
};

const view = async (req, res) => {
  const idRequest = req.params.articleid;
  Article.find({ id: idRequest }, (err, articlePost) => {
    if (err) return handleError(err);
    return res.status(200).send(articlePost);
  });
};

module.exports = {
  view,
  create,
  edit,
  remove,
};
