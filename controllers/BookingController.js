const BaseController = require("./baseController");

class BookingController extends BaseController {
  constructor(bookingModel, propertyModel, propertyAssetModel, guestModel) {
    super(bookingModel);
    this.propertyModel = propertyModel;
    this.propertyAssetModel = propertyAssetModel;
    this.guestModel = guestModel;
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

  async getByUserId(req, res) {
    try {
      const guestId = req.query.guest_id;
      const userBookings = await this.model.findAll({
        where: { guest_id: guestId },
        include: [this.propertyModel, this.propertyAssetModel],
      });

      if (userBookings && userBookings.length > 0) {
        res.json(userBookings);
      } else {
        res.status(404).json({ message: "No bookings found for this user" });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }
  
  async create(req, res) {
    try {
      const userSub = req.body.user_sub;
      const guest = await this.guestModel.findOne({
        where: { user_sub: userSub },
      });

      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }

      const bookingData = {
        ...req.body,
        guest_id: guest.id, // Use the ID from your guests table
      };

      const newBooking = await this.model.create(bookingData);
      res.status(201).json(newBooking);
    } catch (error) {
      // Error handling
    }
  }
}

module.exports = BookingController;
