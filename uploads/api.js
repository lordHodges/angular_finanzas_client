/*eslint-disable*/
var express = require("express");
var multer = require("multer");
var fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
var app = express();

var DIR = "./uploads";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + path.extname(file.originalname)
    );
  },
});
let upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.get("/api/upload", function (req, res) {
  res.end("file catcher example");
});

app.post("/api/upload", function (req, res) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received successfully");
    return res.send({
      success: true,
    });
  }
});

var PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("Working on port " + PORT);
});
