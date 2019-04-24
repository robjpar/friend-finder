const express = require('express');

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server ${__filename} listening on port ${port}`);
});
