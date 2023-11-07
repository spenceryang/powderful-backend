const express = require("express");
const cors = require("cors");
const pg = require("pg");

// .env setup
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// importing DB
const db = require("./db/models/index");
const {
  booking,
  favorite,
  guest,
  maintenance,
  message,
  payment,
  property_assets,
  property,
  propertymanager,
} = db;

// import controllers
const GuestController = require("./controllers/GuestController.js");
const guestController = new GuestController(guest);

// import routers

const GuestRouter = require("./routers/GuestRouter.js");
const guestRouter = new GuestRouter(guestController, express);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routing requests
app.use("/guests", guestRouter.route());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
