const { Schema, model } = require("mongoose");

const launchesSchema = new Schema(
  {
    flightNumber: {
      type: Number,
    },
    mission: {
      type: String,
      required: true,
    },
    rocket: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
      default: "NASA",
    },
    up_coming: {
      type: Boolean,
      required: true,
      default: true,
    },
    success: {
      type: Boolean,
      required: true,
      default: true,
    },
    launchDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Launches = model("launches", launchesSchema);

module.exports = Launches;
