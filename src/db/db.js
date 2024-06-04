require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async function () {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((e) => console.log("MongoDB Connect"))
    .catch((err) => console.error("MongoDB connection error:", err));
  //   await mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log("Connected to MongoDB with Mongoose");
};

module.exports = { connectDatabase };


