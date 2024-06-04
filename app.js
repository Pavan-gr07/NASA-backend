const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
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
    origin: "http://localhost:3000",
  })
);
// Middleware to parse JSON bodies
app.use(morgan("combined"));

app.use("/", launchesRoutes);
app.use("/planets", planetsRouter);

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
module.exports = app;
