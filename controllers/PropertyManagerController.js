const BaseController = require("./baseController");

class PropertyManagerController extends BaseController {
  constructor(propertyManagerModel) {
    super(propertyManagerModel);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await this.model.update(req.body, {
        where: { id: id },
      });

      if (updated) {
        const updatedPropertyManager = await this.model.findByPk(id);
        res.status(200).json(updatedPropertyManager);
      } else {
        res.status(404).json({ message: "Property Manager not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error updating property manager",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.model.destroy({
        where: { id: id },
      });

      if (deleted) {
        res.status(204).json({ message: "Property Manager deleted" });
      } else {
        res.status(404).json({ message: "Property Manager not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error deleting property manager",
        error: error.message,
      });
    }
  }
}

module.exports = PropertyManagerController;
