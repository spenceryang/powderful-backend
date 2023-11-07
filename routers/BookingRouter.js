class BookingRouter {
  constructor(bookingController, express) {
    this.bookingController = bookingController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all properties
    this.router.get("/", (req, res) => {
      this.bookingController.getAll(req, res);
    });

    // Get a booking by ID
    this.router.get("/:id", (req, res) => {
      this.bookingController.getById(req, res);
    });

    // Create a new booking
    this.router.post("/", (req, res) => {
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
