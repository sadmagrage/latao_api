const express = require("express");
const bodyParser = require("body-parser");

const userController = require("../controllers/userController");

const route = express.Router();

route.use(bodyParser.json());

route.post("/login", userController.login);
route.post("/register", userController.register);
route.get("/", userController.data);
route.put("/", userController.update);
route.delete("/", userController.del);

route.get("/flight", userController.getFlights);
route.post("/flight/:flightId", userController.postFlight);

module.exports = route;