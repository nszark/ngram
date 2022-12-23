const express = require('express');
const mongoose = require('mongoose');
const createRoutes = require('./config/routes');
require('dotenv').config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
createRoutes(app);

mongoose.connect('mongodb://127.0.0.1:27017/ngram').then(() => {
  console.info('Mongoose connected succcessfully.');
});

app.listen(port, () => {
  console.info(`Server successfully started on port ${port}.`);
});
