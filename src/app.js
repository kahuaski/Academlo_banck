const cors = require("cors");

//const morgan = require("morgan");
const userRouter = require("./routes/users.router");
const tranferRouter = require("./routes/transfers.router");
const express = require("express");
//const  = require("./controllers/users.controllers");

const app = express();
app.use(express.json());
app.use(cors());
console.log(process.env.NODE_ENV);
app.use("/api/v1/users", userRouter);

app.use("/api/v1/transfers", tranferRouter);
module.exports = app;
