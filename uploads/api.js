var express = require("express");
var multer = require("multer");
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { fileURLToPath } = require("url");

var DIR = "./uploads";
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let upload = multer({ storage: storage });

app.use(
  cors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", function (req, res) {
  res.end("file catcher example");
});

app.post("/api/upload", upload.single("photo"), function (req, res) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received successfully");
    return res.status(200).send(req.file.filename);
  }
});
app.use("/api/download", express.static(DIR));
app.get("/api/download/*", function (req, res) {
  filename = req.params.filename;
  filepath = path.join(__dirname, "../uploads") + "/uploads/" + filename;
  return res.render("index", { req, res }, (err, html) => {
    if (html) {
      res.send(html);
    } else {
      console.error(err);
      res.send(err);
    }
  });
});

var PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("Working on port " + PORT);
});
