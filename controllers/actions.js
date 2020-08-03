const Router = require("express").Router();
const upload = require("./multer");
const Files = require("../model/files");
const path = require("path");
Router.get("/", async (req, res) => {
  const data = await Files.find();
  res.render("dashboard", { data: data });
  res.end();
});
Router.get("/:name", (req, res) => {
  res.download(
    path.join(__dirname, `../uploads/${req.params.name}`),
    req.params.name,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});
Router.post("/", (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 500, message: "error upload file" })
          .end();
      }
      if (!req.file) {
        return res
          .status(411)
          .json({ status: 411, message: "file required" })
          .end();
      }
      const data = new Files({
        name: req.file.filename,
        size: req.file.size,
      });
      await data.save();
      res.status(200).json({ status: 200, message: "succes upload file" });
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = Router;
