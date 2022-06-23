const { connect } = require("./db");
const app = require("./app");

const port = process.env.PORT || 8080;
connect();

app.listen(port, () => {
  console.log(`app running at port ${port}`);
});
