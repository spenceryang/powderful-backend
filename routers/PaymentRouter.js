class PaymentRouter {
  constructor(paymentController, express) {
    this.paymentController = paymentController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Get all properties
    this.router.get("/", (req, res) => {
      this.paymentController.getAll(req, res);
    });

    // Get a payment by ID
    this.router.get("/:id", (req, res) => {
      this.paymentController.getById(req, res);
    });

    // Create a new payment
    this.router.post("/", (req, res) => {
      this.paymentController.create(req, res);
    });

    // Update a payment by ID
    this.router.put("/:id", (req, res) => {
      this.paymentController.update(req, res);
    });

    // Delete a payment by ID
    this.router.delete("/:id", (req, res) => {
      this.paymentController.delete(req, res);
    });

    this.router.post("/create-checkout-session", (req, res) => {
      this.paymentController.createCheckoutSession(req, res);
    });

    this.router.post("/handle-payment-success", (req, res) => {
      this.paymentController.handlePaymentSuccess(req, res);
    });
  }

  route() {
    return this.router;
  }
}

module.exports = PaymentRouter;
