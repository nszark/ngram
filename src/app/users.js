const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

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
    fullName, username, hashedPassword, idRequest,
  } = req.body;

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
  const { email, password } = req.body;

  try {
    const emailPerson = await User.findOne({ email }).exec();
    if (emailPerson !== null) return res.status(404);
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }

  try {
    const newUser = new User({
      id: uuidv4(),
      email,
      password,
    });
    await newUser.save();
    const token = jwt.sign({ email, password }, jwtSecretKey);
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
  try {
    const loginPerson = User.find({ email, password }).exec();
    if (loginPerson == null) return res.status(404);
    const token = jwt.sign({ email, password }, jwtSecretKey);
    return res.status(200).send(`Here is your --> ${token} <--`);
  } catch (err) {
    console.error('view error', err);
    return res.status(500).send({
      message: 'My obosralis`.',
    });
  }
};

const authenticate = async (req, res) => {
  const { token } = req.header;
  try {
    const email = jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) return res.status(401);
      return decoded.email;
    });
    const emailPerson = await User.findOne({ email }).exec();
    if (emailPerson == null) return res.status(404);
    return res.status(200).send(`This is ${email}'s webpage.`);
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
  authenticate,
  edit,
  remove,
};
