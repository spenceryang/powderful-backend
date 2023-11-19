class PropertyRouter {
  constructor(propertyController, express, jwtCheck) {
    this.propertyController = propertyController;
    this.router = express.Router();
    this.jwtCheck = jwtCheck;

    this.setupRoutes();
  }

  setupRoutes() {
    // Get all properties
    this.router.get("/", (req, res) => {
      this.propertyController.getAll(req, res);
    });

    // Get a property that's mine
    this.router.get("/mine", (req, res) => {
      this.propertyController.getPropertiesCreatedByCurrentUser(req, res);
    });

    // Get a property by ID
    this.router.get("/:id", (req, res) => {
      this.propertyController.getById(req, res);
    });

    // Create a new property
    this.router.post("/", this.jwtCheck, (req, res) => {
      this.propertyController.create(req, res);
    });

    // Update a property by ID
    this.router.put("/:id", (req, res) => {
      this.propertyController.update(req, res);
    });

    // Delete a property by ID
    this.router.delete("/:id", (req, res) => {
      this.propertyController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = PropertyRouter;
