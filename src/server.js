const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const userRouter = require("./routes/user.routes");
const listFavRouter = require("./routes/listFav.routes");
const itemRouter = require("./routes/item.routes");

const port = 8080;
const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/favs", listFavRouter);
app.use("/items", itemRouter);

app.listen(port, () => {
  console.log(`app running at port ${port}`);
});
