const express = require('express');
const app = express();

// Server configurations
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Starting the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server ${__filename} listening on port ${port}`);
});
