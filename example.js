const { Router } = require("express");
const multer = require("multer");
var express = require("express");

const path = require("path");

var DIR = "../uploads/egresoHostal";
express.static(DIR);
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

const upload = multer({ storage: storage });
module.exports = function ({ EgresoBancarioController }) {
  const router = Router();
  router.get(
    "/",
    EgresoBancarioController.getAll.bind(EgresoBancarioController)
  );
  router.get(
    "/:id",
    EgresoBancarioController.get.bind(EgresoBancarioController)
  );
  router.post(
    "/upload",
    upload.single("photo"),
    EgresoBancarioController.upload.bind(EgresoBancarioController)
  );
  router.post(
    "/",
    EgresoBancarioController.create.bind(EgresoBancarioController)
  );
  router.put(
    "/:id",
    EgresoBancarioController.update.bind(EgresoBancarioController)
  );
  router.delete(
    "/:id",
    EgresoBancarioController.delete.bind(EgresoBancarioController)
  );

  return router;
};


///////
 async upload(req, res) {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false,
      });
    } else {
      console.log("file received successfully");
      return res.status(200).send(req.file.filename);
    }
  }
