const BaseController = require("./baseController.js");

class GuestController extends BaseController {
  constructor(guestModel) {
    super(guestModel);
  }

  // Overriding the create method to associate with Auth0 user
  async create(req, res) {
    try {
      // Extract user information from Auth0 token
      const userId = req.user.sub; // Assumes user info is attached to req.user

      const newGuestData = { ...req.body, userId };
      const newGuest = await this.model.create(newGuestData);

      res.status(201).json(newGuest);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.sub;

      const guest = await this.model.findOne({ where: { id, userId } });
      if (!guest) {
        return res
          .status(404)
          .json({ message: "Guest not found or unauthorized" });
      }

      const updatedGuest = await guest.update(req.body);
      res.json(updatedGuest);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.sub;

      const guest = await this.model.findOne({ where: { id, userId } });
      if (!guest) {
        return res
          .status(404)
          .json({ message: "Guest not found or unauthorized" });
      }

      await guest.destroy();
      res.status(204).send();
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

module.exports = GuestController;
