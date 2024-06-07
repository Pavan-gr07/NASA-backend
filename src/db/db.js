require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async function () {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((e) => console.log("MongoDB Connect"))
    .catch((err) => console.error("MongoDB connection error:", err));
  // await mongoose.connect(process.env.MONGO_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   connectTimeoutMS: 30000, // Increase connection timeout
  //   socketTimeoutMS: 45000, // Increase socket timeout
  // });
  console.log("Connected to MongoDB with Mongoose");
};

module.exports = { connectDatabase };
