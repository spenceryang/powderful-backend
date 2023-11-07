class PropertyManagerRouter {
  constructor(propertyManagerController, express) {
    this.propertyManagerController = propertyManagerController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all property managers
    this.router.get("/", (req, res) => {
      this.propertyManagerController.getAll(req, res);
    });

    // Get a property manager by ID
    this.router.get("/:id", (req, res) => {
      this.propertyManagerController.getById(req, res);
    });

    // Create a new property manager
    this.router.post("/", (req, res) => {
      this.propertyManagerController.create(req, res);
    });

    // Update a property manager by ID
    this.router.put("/:id", (req, res) => {
      this.propertyManagerController.update(req, res);
    });

    // Delete a property manager by ID
    this.router.delete("/:id", (req, res) => {
      this.propertyManagerController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = PropertyManagerRouter;
