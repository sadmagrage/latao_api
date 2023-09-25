const express = require("express");
const bodyParser = require("body-parser");

const { login, register, data } = require("../controllers/userController");

const route = express.Router();

route.use(bodyParser.json());

route.post("/login", login);
route.post("/register", register);
route.get("/data", data);

module.exports = route;