class PropertyManagerRouter {
  constructor(propertyManagerController, express, jwtCheck) {
    this.propertyManagerController = propertyManagerController;
    this.router = express.Router();
    this.jwtCheck = jwtCheck;
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all property managers
    this.router.get("/", (req, res) => {
      this.propertyManagerController.getAll(req, res);
    });

    // Get a property manager by ID
    this.router.get("/mine", (req, res) => {
      this.propertyManagerController.getIdThroughGuest(req, res);
    });

    // Get a property manager by ID
    this.router.get("/:id", (req, res) => {
      this.propertyManagerController.getById(req, res);
    });

    // Create a new property manager
    this.router.post("/", this.jwtCheck, (req, res) => {
      this.propertyManagerController.create(req, res);
    });

    // Update a property manager by ID
    this.router.put("/:id", this.jwtCheck, (req, res) => {
      this.propertyManagerController.update(req, res);
    });

    // Delete a property manager by ID
    this.router.delete("/:id", this.jwtCheck, (req, res) => {
      this.propertyManagerController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = PropertyManagerRouter;
