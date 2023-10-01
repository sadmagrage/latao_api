const express = require("express");

const route = express.Router();

route.use(express.json());

route.get("/", userTripIdsController.findAll);
route.get("/:userTripIdsId", userTripIdsController.findOne);
route.post("/", userTripIdsController.save);

module.exports = route;