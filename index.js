const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51ODGWPAJDjTgvIdvKjARqzzsmg1fVyHeC30G3tUUj4HislfJuBQXTqOAfbbSOZM4DPTA9Ovkn0YG4fqKviwwXTqc00SPYU8aII"
);

const express = require("express");
const cors = require("cors");
const pg = require("pg");
const jwtCheck = require("./middlewares/auth0Auth.js");

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
  guest_propertymanageradmin,
} = db;

// import controllers
const GuestController = require("./controllers/GuestController.js");
const guestController = new GuestController(guest);

const PropertyManagerController = require("./controllers/PropertyManagerController.js");
const propertyManagerController = new PropertyManagerController(
  propertymanager,
  guest_propertymanageradmin,
  guest
);

const PropertyController = require("./controllers/PropertyController.js");
const propertyController = new PropertyController(
  property,
  property_assets,
  guest,
  propertymanager,
  guest_propertymanageradmin
);

const BookingController = require("./controllers/BookingController.js");
const bookingController = new BookingController(
  booking,
  property,
  property_assets,
  guest,
  guest_propertymanageradmin,
  propertymanager
);

const FavoriteController = require("./controllers/FavoriteController.js");
const favoriteController = new FavoriteController(favorite);

const MaintenanceController = require("./controllers/MaintenanceController.js");
const maintenanceController = new MaintenanceController(maintenance);

const MessageController = require("./controllers/MessageController.js");
const messageController = new MessageController(message);

const PaymentController = require("./controllers/PaymentController.js");
const paymentController = new PaymentController(payment, stripe, booking);

const PropertyAssetController = require("./controllers/PropertyAssetController.js");
const propertyAssetController = new PropertyAssetController(property_assets);

// import routers

const GuestRouter = require("./routers/GuestRouter.js");
const guestRouter = new GuestRouter(guestController, express, jwtCheck);

const PropertyManagerRouter = require("./routers/PropertyManagerRouter.js");
const propertyManagerRouter = new PropertyManagerRouter(
  propertyManagerController,
  express,
  jwtCheck
);

const PropertyRouter = require("./routers/PropertyRouter.js");
const propertyRouter = new PropertyRouter(
  propertyController,
  express,
  jwtCheck
);

const BookingRouter = require("./routers/BookingRouter.js");
const bookingRouter = new BookingRouter(bookingController, express, jwtCheck);

const FavoriteRouter = require("./routers/FavoriteRouter.js");
const favoriteRouter = new FavoriteRouter(favoriteController, express);

const MaintenanceRouter = require("./routers/MaintenanceRouter.js");
const maintenanceRouter = new MaintenanceRouter(maintenanceController, express);

const MessageRouter = require("./routers/MessageRouter.js");
const messageRouter = new MessageRouter(messageController, express);

const PaymentRouter = require("./routers/PaymentRouter.js");
const paymentRouter = new PaymentRouter(paymentController, express, jwtCheck);

const PropertyAssetRouter = require("./routers/PropertyAssetRouter.js");
const propertyAssetRouter = new PropertyAssetRouter(
  propertyAssetController,
  express
);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Custom middleware to apply jwtCheck only for certain conditions
app.use((req, res, next) => {
  // Apply jwtCheck for all routes except GET requests to /properties
  if (req.path.startsWith("/properties") && req.method === "GET") {
    // Skip jwtCheck for GET requests to /properties
    return next();
  } else {
    // Use jwtCheck for all other requests
    return jwtCheck(req, res, next);
  }
});

// Routing requests
app.use("/properties", propertyRouter.route()); // Entirely open to Get for all including ID

app.use("/guests", guestRouter.route()); // Only open to authenticated guests for their own
app.use("/propertymanagers", propertyManagerRouter.route()); // Only open to authenticated property managers for their own
app.use("/bookings", bookingRouter.route()); // Only open to authenticated users / property managers for their own bookings
app.use("/favorites", favoriteRouter.route()); // Only open to authenticated users for their own favorites
app.use("/maintenances", maintenanceRouter.route()); // Only open to property managers for their own
app.use("/messages", messageRouter.route()); // Only open to guests and property managers for their own
app.use("/payments", paymentRouter.route()); // Only open to guests for their own payments
app.use("/propertyassets", propertyAssetRouter.route()); // Open to all to get

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
