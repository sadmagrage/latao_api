const express = require("express");

const cardController = require("../controllers/cardController")

const route = express.Router();

route.use(express.json());

route.get("/", cardController.findAll);
route.get("/:userId", cardController.findOne);
route.post("/", cardController.save);

module.exports = route;