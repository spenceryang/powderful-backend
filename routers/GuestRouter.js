class GuestRouter {
  constructor(guestController, express) {
    this.guestController = guestController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(
      "/",
      this.guestController.getAll.bind(this.guestController)
    );
    this.router.get(
      "/:id",
      this.guestController.getById.bind(this.guestController)
    );
    this.router.post(
      "/",
      this.guestController.createOne.bind(this.guestController)
    );
  }

  route() {
    return this.router;
  }
}

module.exports = GuestRouter;
