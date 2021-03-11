import path from "path";
import express from "express";
import { MongoClient } from "mongodb";
import template from "./../template";
import config from "./config/config";
import mongoose from "mongoose";

import app from "./app";
//comment out before building for production
import devBundle from "./devBundle";

//comment out before building for production
devBundle.compile(app);

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  throw new Error("Unable to connect to the database" + mongoURI);
});

// Database Connection URL
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/video";
// Use connect method to connect to the server
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    console.log("Connected successfully to mongodb server");
    db.close();
  }
);

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});
