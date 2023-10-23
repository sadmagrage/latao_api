const express = require("express");
const swaggerUi = require("swagger-ui-express")

const swagger = require("./swagger.json");

const userRoute = require("./routes/userRoute");
const flightRoute = require("./routes/flightRoute");
const destinationRoute = require("./routes/destinationRoute");
const cardRoute = require("./routes/cardRoute");

const app = express();

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swagger));
app.use("/user", userRoute);
app.use("/flight", flightRoute);
app.use("/destination", destinationRoute);
app.use("/card", cardRoute);

const port = 3000;

if (process.env.NODE_ENV !== "test") app.listen(port, () => console.log(`Rodando na porta ${ port }`));

module.exports = app;