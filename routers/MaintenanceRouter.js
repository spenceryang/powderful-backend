class MaintenanceRouter {
  constructor(maintenanceController, express) {
    this.maintenanceController = maintenanceController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all properties
    this.router.get("/", (req, res) => {
      this.maintenanceController.getAll(req, res);
    });

    // Get a maintenance by ID
    this.router.get("/:id", (req, res) => {
      this.maintenanceController.getById(req, res);
    });

    // Create a new maintenance
    this.router.post("/", (req, res) => {
      this.maintenanceController.create(req, res);
    });

    // Update a maintenance by ID
    this.router.put("/:id", (req, res) => {
      this.maintenanceController.update(req, res);
    });

    // Delete a maintenance by ID
    this.router.delete("/:id", (req, res) => {
      this.maintenanceController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = MaintenanceRouter;
