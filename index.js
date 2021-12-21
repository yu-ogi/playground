#! /usr/bin/env node

const path = require("path");

const dir = path.resolve(__dirname, process.argv[2]);

const express = require("express");
const app = express();

app.use("/public", express.static("public"));
app.use("/content", express.static(dir));

app.listen(8080);
