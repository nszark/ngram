const jwt = require('jsonwebtoken');
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

const checkEmail = async (req, res, next) => {
  const emailReq = req.body.email;
  const emailPerson = User.find({ email: emailReq }, (err, person) => {
    if (err) return res.status(404);
    return person;
  });
  if (emailPerson != null) next();
  return res.status(404);
};

const addToDatabase = async (req, res) => {
  const signupInfo = req.body;
  const newUser = new User({
    id: uuidv4(),
    email: signupInfo.email,
    password: signupInfo.password,
  });
  newUser.save((err) => {
    if (err) return handleError(err);
    return res.status(200).send('Done!');
  });
};

const login = async (req, res, next) => {
  const loginInfo = req.body;
  const loginPerson = User.find(
    { email: loginInfo.email, password: loginInfo.password },
    (err, person) => {
      if (err) return res.status(404);
      return person;
    },
  );
  // generate web token + return it
  if (loginPerson !== null) next();
  return res.status(404);
};

module.exports = {
  viewAll,
  view,
  login,
  checkEmail,
  addToDatabase,
  edit,
  remove,
};
