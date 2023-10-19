const express = require("express");

const destinationController = require("../controllers/destinationController");

const route = express.Router();

route.use(express.json());

route.get("/", destinationController.findAll);
route.get("/:destinationId", destinationController.findOne);
route.post("/", destinationController.save);
route.put("/:destinationId", destinationController.update);
route.delete("/:destinationId", destinationController.del);

module.exports = route;