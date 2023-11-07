class MessageRouter {
  constructor(messageController, express) {
    this.messageController = messageController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all properties
    this.router.get("/", (req, res) => {
      this.messageController.getAll(req, res);
    });

    // Get a message by ID
    this.router.get("/:id", (req, res) => {
      this.messageController.getById(req, res);
    });

    // Create a new message
    this.router.post("/", (req, res) => {
      this.messageController.create(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = MessageRouter;
