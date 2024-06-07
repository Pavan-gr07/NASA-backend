const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const https = require("https");
const fs = require("fs");

const { connectDatabase } = require("./src/db/db");

const planetsRouter = require("./src/routes/planets.router");
const launchesRoutes = require("./src/routes/launchesRoutes");

const { loadPlanetsData } = require("./src/models/planets.model");

connectDatabase("NASA-launches");
loadPlanetsData();
console.log("first");

const app = express();
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://main.d303fko48e77mg.amplifyapp.com/",
      "http://13.126.132.34:9000",
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
// Middleware to parse JSON bodies
app.use(morgan("combined"));

app.use("/", launchesRoutes);
app.use("/planets", planetsRouter);

const httpsOptions = {
  key: fs.readFileSync("./src/utils/nasa-backend.pem"),
};

// app.listen(process.env.PORT, function () {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

https
  .createServer(httpsOptions, app)
  .listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${process.env.PORT} over HTTPS`);
  });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
module.exports = app;
