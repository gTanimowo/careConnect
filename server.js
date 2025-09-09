const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/errorHandler");
port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Care connect in progress!");
});

const apiRouter = require("./server/api");
app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
