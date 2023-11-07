class FavoriteRouter {
  constructor(favoriteController, express) {
    this.favoriteController = favoriteController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all properties
    this.router.get("/", (req, res) => {
      this.favoriteController.getAll(req, res);
    });

    // Get a favorite by ID
    this.router.get("/:id", (req, res) => {
      this.favoriteController.getById(req, res);
    });

    // Create a new favorite
    this.router.post("/", (req, res) => {
      this.favoriteController.create(req, res);
    });

    // Delete a favorite by ID
    this.router.delete("/:id", (req, res) => {
      this.favoriteController.delete(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = FavoriteRouter;
