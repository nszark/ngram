const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

function handleError(err) {
  return err;
}

const viewAll = async (req, res) => {
  User.find({}, (err, person) => {
    if (err) return handleError(err);
    return res.status(200).send(person);
  });
};

const view = async (req, res) => {
  const idRequest = req.params.id;

  User.find({ id: idRequest }, (err, person) => {
    if (err) return handleError(err);
    return res.status(200).send(person);
  });
};

const create = async (req, res) => {
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
};

const edit = async (req, res) => {
  const userRequest = req.body;
  const idRequest = req.params.id;
  User.updateOne(
    { id: idRequest },
    {
      fullName: userRequest.fullName,
      username: userRequest.username,
      hashedPassword: userRequest.hashedPassword,
    },
    (err, person) => {
      if (err) return handleError(err);
      return res.status(200).send(person);
    },
  );
};

const remove = async (req, res) => {
  const idRequest = req.params.id;
  User.deleteOne({ id: idRequest }, (err, person) => {
    if (err) return handleError(err);
    return res.status(200).send(person);
  });
};

module.exports = {
  viewAll,
  view,
  create,
  edit,
  remove,
};
