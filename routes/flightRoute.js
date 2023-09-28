const bodyParser = require("body-parser");
const express = require("express");

const route = express.Router();

route.use(bodyParser.json());



module.exports = route;