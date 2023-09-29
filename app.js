const express = require("express");

const userRoute = require("./routes/userRoute");
const flightRoute = require("./routes/flightRoute");
const destinationRoute = require("./routes/destinationRoute");
const cardRoute = require("./routes/cardRoute");
const userTripIdsRoute = require("./routes/userTripIdsRoute");

const app = express();

app.use("/user", userRoute);
app.use("/flight", flightRoute);
app.use("/destination", destinationRoute);
/*
app.use("/card", cardRoute);
app.use("/userTripIds", userTripIdsRoute); */

const port = 3000;

app.listen(port, () => console.log(`Rodando na porta ${ port }`));
