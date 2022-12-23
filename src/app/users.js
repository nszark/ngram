const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/user.model');

const saltRounds = 10;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const viewAll = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    return res.status(200).send(users);
  } catch (err) {
    console.error('viewAll error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

const view = async (req, res) => {
  const idRequest = req.params.id;

  try {
    const user = await User.findOne({ id: idRequest }).exec();
    return res.status(200).send(user);
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

const edit = async (req, res) => {
  const {
    fullName, username, password, idRequest,
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  try {
    const user = await User.updateOne(
      { id: idRequest },
      { fullName, username, hashedPassword },
    ).exec();
    return res.status(200).send(user.acknowledged);
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

const remove = async (req, res) => {
  const { idRequest } = req.body;
  try {
    const user = await User.deleteOne({ id: idRequest }).exec();
    return res.status(200).send(user.acknowledged);
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

const signup = async (req, res) => {
  const {
    email, password, fullName, username,
  } = req.body;

  console.log(email);
  try {
    const emailPerson = await User.findOne({ email }).exec();
    console.log(emailPerson);
    if (emailPerson !== null) return res.status(404).send('Email already exists in system.');
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({
      id: uuidv4(),
      email,
      hashedPassword,
      fullName,
      username,
    });
    await newUser.save();
    const token = jwt.sign({ email, hashedPassword }, jwtSecretKey);
    return res.status(200).send(`Here is your --> ${token} <--`);
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  try {
    const loginPerson = User.find({ email, hashedPassword }).exec();
    if (loginPerson == null) return res.status(404).send('Person already exists.');
    const token = jwt.sign({ email, hashedPassword }, jwtSecretKey);
    return res.status(200).send(`Here is your --> ${token} <--`);
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

module.exports = {
  viewAll,
  view,
  login,
  signup,
  edit,
  remove,
};
