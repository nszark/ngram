const articles = require('../app/articles');
const users = require('../app/users');

module.exports = (app) => {
  app.get('/', users.viewAll);
  app.get('/user/:id', users.view);
  app.post('/user/add', users.create);
  app.put('/user/:id/update', users.edit);
  app.delete('/user/:id/delete', users.remove);

  app.get('/article/:articleid', articles.view);
  app.post('/article/add', articles.create);
  app.put('/article/:articleid/update', articles.edit);
  app.delete('/article/:articleid/delete', articles.remove);
};
