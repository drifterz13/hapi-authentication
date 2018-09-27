const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/hapi-api-db",
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log(`🚀 connect to mongodb`))
  .catch(err => {
    throw err;
  });

module.exports.User = require("./User");
