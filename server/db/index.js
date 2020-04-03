const cachegoose = require('cachegoose');
const mongoose = require('mongoose');
const config = require('../../config.js');

// Initialize the DB connection
mongoose
  .connect(`mongodb://${config.mongo_hostname}/${config.backend_db}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    if (res) {
      console.log('Connected to MongoDB Successfully');
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDb', err);
  });

cachegoose(mongoose);

module.exports = {
  mongoose,
};
