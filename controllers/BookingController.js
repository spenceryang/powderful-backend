const BaseController = require("./baseController");

class BookingController extends BaseController {
  constructor(
    bookingModel,
    propertyModel,
    propertyAssetModel,
    guestModel,
    guestPropertyManagerAdminModel
  ) {
    super(bookingModel);
    this.propertyModel = propertyModel;
    this.propertyAssetModel = propertyAssetModel;
    this.guestModel = guestModel;
    this.guestPropertyManagerAdminModel = guestPropertyManagerAdminModel;
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

  async getByPropertyManager(req, res) {
    try {
      const userSub = req.query.user_sub;
      const guest = await this.guestModel.findOne({
        where: { user_sub: userSub },
      });

      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
      // Find the corresponding PropertyManagerAdmin using guest's ID
      const guestPropertyManagerAdmin =
        await this.guestPropertyManagerAdminModel.findOne({
          where: { guest_id: guest.id },
        });

      if (!guestPropertyManagerAdmin) {
        return res
          .status(404)
          .json({ message: "Property Manager Admin not found" });
      }
      // Extract the propertymanager_id from propertyManagerAdmin
      const propertyManagerId = guestPropertyManagerAdmin.propertymanager_id;

      // Fetch all properties created by the property manager
      const properties = await this.propertyModel.findAll({
        where: { propertymanager_id: propertyManagerId },
      });

      if (!properties || properties.length === 0) {
        return res.status(404).json({ message: "No properties found" });
      }

      // Extract the property_id's from properties
      const propertyIds = properties.map((property) => property.id);

      // Fetch all bookings created for these properties
      const propertyBookings = await this.model.findAll({
        where: { property_id: propertyIds }, // Adjust this line to use the array of IDs
      });

      if (propertyBookings && propertyBookings.length > 0) {
        res.json(propertyBookings);
      } else {
        res
          .status(404)
          .json({ message: "No bookings found for this property manager" });
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
