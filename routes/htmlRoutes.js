const path = require('path');

module.exports = (app) => {
  // "Survey" route
  app.get('/survey', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/survey.html')));

  // Default route -- must be the last one in the order of routes
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/home.html')));

};
