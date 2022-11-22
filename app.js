const express = require('express');
const mongoose = require('mongoose');
const createRoutes = require('./src/config/routes');

const port = 5000;

const app = express();
app.use(express.json());
createRoutes(app);

mongoose.connect('mongodb://127.0.0.1:27017/ngram');

app.listen(port, () => {
  console.log(`Server successfully started on port ${port}.`);
});
