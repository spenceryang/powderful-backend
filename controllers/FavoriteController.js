const BaseController = require("./baseController");

class FavoriteController extends BaseController {
  constructor(favoriteModel) {
    super(favoriteModel);
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
        res.status(404).json({ message: "Favorite not found" });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  }
}

module.exports = FavoriteController;
