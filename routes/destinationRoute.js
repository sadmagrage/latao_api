const express = require("express");

const destinationController = require("../controllers/destinationController");

const route = express.Router();

route.use(express.json());

route.get("/", destinationController.findAll);
route.get("/:destinationId", destinationController.findOne);
route.post("/", destinationController.save);

module.exports = route;