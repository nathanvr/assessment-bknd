require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const listFavRouter = require("./routes/listFav.routes");
const itemRouter = require("./routes/item.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/favs", listFavRouter);
app.use("/items", itemRouter);

module.exports = app;
