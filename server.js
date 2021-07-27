require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const { DEFAULT_PORT } = require("./utils/constants");

const shortener_controller = require("./controllers/shortener");

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// GET shortener endpoint
app.get("/api/shorturl/:id", shortener_controller.get_link);

// POST shortener endpoint
app.post("/api/shorturl", shortener_controller.post_link);

const listener = app.listen(DEFAULT_PORT || process.env.PORT, function () {
  console.log(`Listening on port ${listener.address().port}`);
});
