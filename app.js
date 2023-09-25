const express = require("express");
const User = require("./models/UserModel");

const userRoute = require("./routes/userRoute");

const app = express();

app.use("/user", userRoute);

const port = 3000;

User.sync()
    .then(() => app.listen(port, () => console.log(`Rodando na porta ${ port }`)));