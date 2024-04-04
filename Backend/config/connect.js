const mongoose = require("mongoose");
require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
        ` connexion avec data base successfully ${mongoose.connection.host}`
        .bgMagenta.bgCyan
    );
  } catch (error) {
    console.log(`erreur lors du connexion avec data base ${error}`);
  }
};

module.exports = connectDb;