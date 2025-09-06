const express = require("express"),
  app = express(),
  cors = require("cors"),
  helmet = require("helmet"),
  bodyParser = require("body-parser");
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

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
