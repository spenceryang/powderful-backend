const BaseController = require("./baseController");

class PropertyController extends BaseController {
  constructor(propertyModel, propertyAssetModel) {
    super(propertyModel);
    this.propertyAssetModel = propertyAssetModel;
  }

  async getAll(req, res) {
    try {
      const records = await this.model.findAll({
        include: this.propertyAssetModel,
      });
      res.json(records);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await this.model.update(req.body, {
        where: { id: id },
      });

      if (updated) {
        const updatedProperty = await this.model.findByPk(id);
        res.status(200).json(updatedProperty);
      } else {
        res.status(404).json({ message: "Property not found" });
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
        res.status(404).json({ message: "Property not found" });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

module.exports = PropertyController;
