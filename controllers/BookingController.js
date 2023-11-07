const BaseController = require("./baseController");

class BookingController extends BaseController {
  constructor(bookingModel) {
    super(bookingModel);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await this.model.update(req.body, {
        where: { id: id },
      });

      if (updated) {
        const updatedBooking = await this.model.findByPk(id);
        res.status(200).json(updatedBooking);
      } else {
        res.status(404).json({ message: "Booking not found" });
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
        res.status(404).json({ message: "Booking not found" });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

module.exports = BookingController;
