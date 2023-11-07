const BaseController = require("./baseController");

class MessageController extends BaseController {
  constructor(messageModel) {
    super(messageModel);
  }
}

module.exports = MessageController;
