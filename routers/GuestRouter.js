class GuestRouter {
  constructor(guestController, express) {
    this.guestController = guestController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all guests
    this.router.get("/", (req, res) => {
      this.guestController.getAll(req, res);
    });

    // Get a guest by ID
    this.router.get("/:id", (req, res) => {
      this.guestController.getById(req, res);
    });

    // Create a new guest
    this.router.post("/", (req, res) => {
      this.guestController.create(req, res);
    });

    // Update a guest by ID
    this.router.put("/:id", (req, res) => {
      this.guestController.update(req, res);
    });

    // Delete a guest by ID
    this.router.delete("/:id", (req, res) => {
      this.guestController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = GuestRouter;
