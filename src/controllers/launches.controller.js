const Launches = require("../models/launches");

const httpGetAllLaunches = async (req, res, next) => {
  try {
    const launches = await Launches.find();
    return res.status(200).json(launches);
  } catch (error) {
    next(error);
    console.error("Error getting launches:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const httpLAddNewLaunches = async (req, res, next) => {
  const { mission, rocket, target, launchDate } = req.body;

  if (!mission || !rocket || !target || !launchDate) {
    return res.status(400).send("All fields are required");
  }
  try {
    const launch = await Launches.create({
      mission,
      rocket,
      target,
      launchDate,
    });

    return res
      .status(200)
      .json({ message: "launch added successfully", launch });
  } catch (error) {
    next(error);
    console.error("Error adding budget:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const httpAbortLaunch = async (req, res, next) => {
  const launchId = req.query.id;

  if (!launchId) {
    return res.status(400).send("LaunchId is required");
  }
  try {
    const launch = await Launches.findById(launchId);
    launch.up_coming = false;
    launch.success = false;

    await launch.save();

    return res.status(200).json({ message: "Launch Aborted successfully" });
  } catch (error) {
    next(error);
    console.error("Error adding budget:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  httpLAddNewLaunches,
  httpAbortLaunch,
  httpGetAllLaunches,
};
