const articles = require('../app/articles');

module.exports = (app) => {
  app.post('/article/add', articles.new);
  app.put('/article/:articleid/update', articles.edit);
  app.delete('/article/:articleid/delete', articles.new);
};
