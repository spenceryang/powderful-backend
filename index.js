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

const PropertyManagerController = require("./controllers/PropertyManagerController.js");
const propertyManagerController = new PropertyManagerController(
  propertymanager
);

const PropertyController = require("./controllers/PropertyController.js");
const propertyController = new PropertyController(property);

const BookingController = require("./controllers/BookingController.js");
const bookingController = new BookingController(booking);

const FavoriteController = require("./controllers/FavoriteController.js");
const favoriteController = new FavoriteController(favorite);

const MaintenanceController = require("./controllers/MaintenanceController.js");
const maintenanceController = new MaintenanceController(maintenance);

const MessageController = require("./controllers/MessageController.js");
const messageController = new MessageController(message);

const PaymentController = require("./controllers/PaymentController.js");
const paymentController = new PaymentController(payment);

const PropertyAssetController = require("./controllers/PropertyAssetController.js");
const propertyAssetController = new PropertyAssetController(property_assets);

// import routers

const GuestRouter = require("./routers/GuestRouter.js");
const guestRouter = new GuestRouter(guestController, express);

const PropertyManagerRouter = require("./routers/PropertyManagerRouter.js");
const propertyManagerRouter = new PropertyManagerRouter(
  propertyManagerController,
  express
);

const PropertyRouter = require("./routers/PropertyRouter.js");
const propertyRouter = new PropertyRouter(propertyController, express);

const BookingRouter = require("./routers/BookingRouter.js");
const bookingRouter = new BookingRouter(bookingController, express);

const FavoriteRouter = require("./routers/FavoriteRouter.js");
const favoriteRouter = new FavoriteRouter(favoriteController, express);

const MaintenanceRouter = require("./routers/MaintenanceRouter.js");
const maintenanceRouter = new MaintenanceRouter(maintenanceController, express);

const MessageRouter = require("./routers/MessageRouter.js");
const messageRouter = new MessageRouter(messageController, express);

const PaymentRouter = require("./routers/PaymentRouter.js");
const paymentRouter = new PaymentRouter(paymentController, express);

const PropertyAssetRouter = require("./routers/PropertyAssetRouter.js");
const propertyAssetRouter = new PropertyAssetRouter(
  propertyAssetController,
  express
);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routing requests
app.use("/guests", guestRouter.route());
app.use("/propertymanagers", propertyManagerRouter.route());
app.use("/properties", propertyRouter.route());
app.use("/bookings", bookingRouter.route());
app.use("/favorites", favoriteRouter.route());
app.use("/maintenances", maintenanceRouter.route());
app.use("/messages", messageRouter.route());
app.use("/payments", paymentRouter.route());
app.use("/propertyassets", propertyAssetRouter.route());
app.use("/propertyasset", propertyAssetRouter.route());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
