class PropertyAssetRouter {
  constructor(propertyAssetController, express, jwtCheck) {
    this.propertyAssetController = propertyAssetController;
    this.router = express.Router();
    this.jwtCheck = jwtCheck;
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all properties
    this.router.get("/", (req, res) => {
      this.propertyAssetController.getAll(req, res);
    });

    // Get a propertyAsset by ID
    this.router.get("/:id", (req, res) => {
      this.propertyAssetController.getById(req, res);
    });

    // Create a new propertyAsset
    this.router.post("/", this.jwtCheck, (req, res) => {
      this.propertyAssetController.create(req, res);
    });

    // Update a propertyAsset by ID
    this.router.put("/:id", (req, res) => {
      this.propertyAssetController.update(req, res);
    });

    // Delete a propertyAsset by ID
    this.router.delete("/:id", (req, res) => {
      this.propertyAssetController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = PropertyAssetRouter;
