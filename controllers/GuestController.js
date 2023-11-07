const BaseController = require("./baseController.js");

class GuestController extends BaseController {
  constructor(guestModel) {
    super(guestModel);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const guest = await this.model.findByPk(id);

      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }

      const updatedGuest = await guest.update(req.body);
      res.json(updatedGuest);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error updating guest", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const guest = await this.model.findByPk(id);

      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }

      await guest.destroy();
      res.status(204).send(); // No content to send back
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error deleting guest", error: error.message });
    }
  }
}

module.exports = GuestController;
