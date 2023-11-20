const BaseController = require("./baseController");

class PropertyController extends BaseController {
  constructor(
    propertyModel,
    propertyAssetModel,
    guestModel,
    propertyManagerModel,
    guestPropertyManagerAdminModel
  ) {
    super(propertyModel);
    this.propertyAssetModel = propertyAssetModel;
    this.guestModel = guestModel;
    this.propertyManagerModel = propertyManagerModel;
    this.guestPropertyManagerAdminModel = guestPropertyManagerAdminModel;
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

  async getById(req, res) {
    try {
      const record = await this.model.findByPk(req.params.id, {
        include: this.propertyAssetModel,
      });
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(record);
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

  async create(req, res) {
    try {
      const userSub = req.body.user_sub;
      // Find the corresponding guest
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

      // Create a new property listing with the propertymanager_id as a foreign key
      const newPropertyData = {
        ...req.body,
        propertymanager_id: propertyManagerId, // Assuming this is the correct field name
      };
      console.log(newPropertyData);

      const newProperty = await this.model.create(newPropertyData);

      res.status(201).json(newProperty);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getPropertiesCreatedByCurrentUser(req, res) {
    try {
      const userSub = req.query.user_sub;
      console.log(userSub);
      // Find the corresponding guest
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
      const properties = await this.model.findAll({
        where: { propertymanager_id: propertyManagerId },
        include: this.propertyAssetModel,
        order: [["created_at", "DESC"]],
      });

      if (!properties || properties.length === 0) {
        return res.status(404).json({ message: "No properties found" });
      }

      res.status(200).json(properties);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

module.exports = PropertyController;
