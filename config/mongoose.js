const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hospital-api');

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'something went wrong on mongoose connection')
);

db.once('open', () => {
  console.log('Database is connected');
});
