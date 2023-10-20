const bodyParser = require("body-parser");
const express = require("express");

const flightController = require("../controllers/flightController");

const route = express.Router();

route.use(bodyParser.json());

route.get("/", flightController.findAll);
route.get("/:flightId", flightController.findOne);
route.post("/", flightController.save);
route.put("/:flightId", flightController.update);
route.delete("/:flightId", flightController.del);

module.exports = route;