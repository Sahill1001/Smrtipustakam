const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://sahill1001:Sahil7718@inotebook.esuzznv.mongodb.net/iNotebook";

const connectToMongodb = async () => {
  await mongoose.connect(mongoURI);
  console.log("Connection Stablished");
};
module.exports = connectToMongodb;
