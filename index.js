require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const compression = require("compression");
const Files = require("./model/files");
// connect mongodb
mongoose
  .connect("mongodb://root:root@127.0.0.1:27017/files?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));

// parse json
app.use(bodyParser.json());

// use compression
app.use(compression());
// set view engine
app.set("view engine", "ejs");

// set path view
app.set("views", "./views");

// set public folder
app.use("/public", express.static(path.join(__dirname, "public")));
// route
app.use("/action", require("./controllers/actions"));

app.get("/", async (req, res) => {
  const data = await Files.find();
  res.render("dashboard", { data });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
