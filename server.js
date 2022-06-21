const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const userRouter = require("./src/routes/user.routes");
const { auth } = require("./src/utils/auth");

const port = 8080;
const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.get("/", auth, (req, res) => {
  console.log(req.user);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`app running at port ${port}`);
});
