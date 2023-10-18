const express = require("express");

const cardController = require("../controllers/cardController")

const route = express.Router();

route.use(express.json());

route.get("/:userId", cardController.findAll);
route.get("/:userId/:cardId", cardController.findOne);
route.post("/:userId", cardController.save);
route.put("/:userId/:cardId", cardController.update);
route.delete("/:userId/:cardId", cardController.del);

module.exports = route;