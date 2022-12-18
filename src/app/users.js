const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

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

const signup = async (req, res) => {
  const { email, password } = req.body;
  const emailPerson = User.find({ email }, (err, person) => {
    if (err) return res.status(404);
    return person;
  });
  if (emailPerson === null) return res.status(404);
  const newUser = new User({
    id: uuidv4(),
    email,
    password,
  });
  const token = jwt.sign({ email, password }, jwtSecretKey);
  newUser.save((err) => {
    if (err) return res.status(404);
    return res.status(200).send(`Here is your --> ${token} <--`);
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const loginPerson = User.find(
    { email, password },
    (err, person) => {
      if (err) return res.status(404);
      return person;
    },
  );
  const token = jwt.sign({ email, password }, jwtSecretKey);
  if (loginPerson == null) return res.status(404);
  return res.status(200).send(`Here is your --> ${token} <--`);
};

const authenticate = async (req, res) => {
  const { token } = req.body;
  const email = jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) return res.status(401);
    return decoded.email;
  });
  const emailPerson = User.find({ email }, (err, person) => {
    if (err) return res.status(404);
    return person;
  });
  if (emailPerson == null) return res.status(404);
  return res.status(200).send(`This is ${email}'s webpage.`);
};

module.exports = {
  viewAll,
  view,
  login,
  signup,
  authenticate,
  edit,
  remove,
};
