class BookingRouter {
  constructor(bookingController, express, jwtCheck) {
    this.bookingController = bookingController;
    this.router = express.Router();
    this.jwtCheck = jwtCheck;
    this.setupRoutes();
  }

  // Todo protect routes with jwtcheck

  setupRoutes() {
    // Get all bookings
    this.router.get("/", (req, res) => {
      this.bookingController.getAll(req, res);
    });

    // Adjusted route for fetching bookings by user ID
    this.router.get("/user", (req, res) => {
      this.bookingController.getByUserId(req, res);
    });

    // Get bookings for a property manager
    this.router.get("/mine", this.jwtCheck, (req, res) => {
      this.bookingController.getByPropertyManager(req, res);
    });

    // Get a booking by ID
    this.router.get("/:id", (req, res) => {
      this.bookingController.getById(req, res);
    });

    // Create a new booking
    this.router.post("/", this.jwtCheck, (req, res) => {
      this.bookingController.create(req, res);
    });

    // Update a booking by ID
    this.router.put("/:id", (req, res) => {
      this.bookingController.update(req, res);
    });

    // Delete a booking by ID
    this.router.delete("/:id", (req, res) => {
      this.bookingController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = BookingRouter;
