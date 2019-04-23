const express = require('express');

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server ${__filename} listening on port ${port}`);
});
