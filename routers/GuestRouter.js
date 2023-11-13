class GuestRouter {
  constructor(guestController, express, jwtCheck) {
    this.guestController = guestController;
    this.router = express.Router();
    this.jwtCheck = jwtCheck;
    this.setupRoutes();
  }

  setupRoutes() {
    // Apply jwtCheck middleware to all routes except 'GET /'
    this.router.use(this.jwtCheck);

    // Get all guests - assuming this is for admin purposes
    this.router.get("/", (req, res) => {
      this.guestController.getAll(req, res);
    });

    // Get a guest by ID - secured, user can only access their data
    this.router.get("/:id", (req, res) => {
      this.guestController.getById(req, res);
    });

    // Create a new guest - secured
    this.router.post("/", (req, res) => {
      this.guestController.create(req, res);
    });

    // Update a guest by ID - secured, user can only update their data
    this.router.put("/:id", (req, res) => {
      this.guestController.update(req, res);
    });

    // Delete a guest by ID - secured, user can only delete their data
    this.router.delete("/:id", (req, res) => {
      this.guestController.delete(req, res);
    });

    // Add a new route for check-or-create functionality
    this.router.post("/check-or-create", (req, res) => {
      this.guestController.checkOrCreate(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = GuestRouter;
