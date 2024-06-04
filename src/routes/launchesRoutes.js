const express = require("express");
const {
  httpLAddNewLaunches,
  httpAbortLaunch,
  httpGetAllLaunches,
} = require("../controllers/launches.controller");

const router = express.Router();

router.get("/", httpGetAllLaunches);
router.post("/launches", httpLAddNewLaunches);
router.put("/:id", httpAbortLaunch);

module.exports = router;
