const express = require('express');

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server ${__filename} listening on port ${port}`);
});
