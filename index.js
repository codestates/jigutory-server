const express = require("express");
require("dotenv").config();
const models = require("./models");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
const logger = require("morgan");

const port = process.env.PORT || 4000;
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(logger("dev"));

// express 라우팅
//더 추가 되어야 함
app.use(cookieParsesr())
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

pp.use("/user", userRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  return res.send("GET request to the homepage");
});

const server = app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

module.exports = server;
