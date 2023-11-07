class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    try {
      const records = await this.model.findAll(this.getQueryOptions(req));
      res.json(records);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getById(req, res) {
    try {
      const record = await this.model.findByPk(req.params.id);
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(record);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async create(req, res) {
    try {
      const newRecord = await this.model.create(req.body);
      res.status(201).json(newRecord);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  getQueryOptions(req) {
    // generic query options logic here, like pagination, sorting, etc.
    return {};
  }

  handleError(res, error) {
    // generic error handling here
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = BaseController;
