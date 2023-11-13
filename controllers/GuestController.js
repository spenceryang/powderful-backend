const BaseController = require("./baseController.js");

class GuestController extends BaseController {
  constructor(guestModel) {
    super(guestModel);
  }

  // Overriding the create method to associate with Auth0 user
  async create(req, res) {
    try {
      // Extract user information from Auth0 token
      const { email, name, user_sub } = req.body;
      const newGuest = await this.model.create({
        email,
        name,
        user_sub,
      });

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

  async checkOrCreate(req, res) {
    try {
      const { email, name, user_sub } = req.body;

      // Check if a guest with the given user_sub or email already exists
      let guest = await this.model.findOne({ where: { user_sub } });

      if (!guest) {
        // If not, create a new guest
        guest = await this.model.create({ email, name, user_sub });
      }

      // Send back the internal user ID along with the guest data
      res.json({ ...guest.toJSON(), internalUserId: guest.id });
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

module.exports = GuestController;
