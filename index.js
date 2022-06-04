const express = require('express');
const PORT = '9633';
const app = express();
const db = require('./config/mongoose.js');

const bodyParser = require('body-parser');

const JWTStrategy = require('./config/passport-jwt-strategy');

// body parser for parsing the response
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, (err) => {
  if (err) {
    console.log('something went wrong', err);
  }
  console.log(`server is running on http://localhost:${PORT}`);
});
