const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database Connected to MongoDb ${mongoose.connection.host}`.bgBlack.white
    );
  } catch (error) {
    console.log(`MongoDB Server Error ${error}`.bgRed.white);
  }
};

module.exports = connectDb;
