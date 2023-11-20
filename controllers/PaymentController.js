const BaseController = require("./baseController");

class PaymentController extends BaseController {
  constructor(paymentModel, stripe, bookingModel) {
    super(paymentModel);
    this.stripe = stripe;
    this.bookingModel = bookingModel;
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await this.model.update(req.body, {
        where: { id: id },
      });

      if (updated) {
        const updatedPayment = await this.model.findByPk(id);
        res.status(200).json(updatedPayment);
      } else {
        res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.model.destroy({
        where: { id: id },
      });

      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: "Payment not found" });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async createCheckoutSession(req, res) {
    try {
      const { amount, description, bookingId } = req.body; // Include bookingId in the request

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "jpy",
              product_data: {
                name: description,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.YOUR_DOMAIN}/cancel`,

        metadata: { bookingId }, // Add bookingId to metadata
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async handlePaymentSuccess(req, res) {
    try {
      const { sessionId } = req.body;
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);

      // Retrieve the bookingId from the Stripe session metadata
      const bookingId = session.metadata.bookingId;

      // Update the booking status using the retrieved booking id
      const updatedBooking = await this.bookingModel.update(
        { payment_status: "paid" },
        { where: { id: bookingId } } // Use the retrieved bookingId here
      );

      // Check if the booking update was successful
      if (updatedBooking) {
        res
          .status(200)
          .json({ message: "Booking payment status updated successfully" });
      } else {
        // Handle case where booking update was not successful
        res.status(404).json({ message: "Booking not found or update failed" });
      }
    } catch (error) {
      // Error handling
      this.handleError(res, error);
    }
  }
}

module.exports = PaymentController;
