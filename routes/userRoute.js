const express = require("express");
const bodyParser = require("body-parser");

const userController = require("../controllers/userController");

const route = express.Router();

route.use(bodyParser.json());

route.post("/login", userController.login);
route.post("/register", userController.register);
route.get("/data", userController.data);
route.put("/update", userController.update);
route.delete("/delete", userController.del);

module.exports = route;