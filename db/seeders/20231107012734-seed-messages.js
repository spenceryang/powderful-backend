"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "messages",
      [
        {
          content:
            "Could you please provide more details about the WiFi service?",
          guest_id: 1,
          propertymanager_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "Is there a parking space included with the property?",
          guest_id: 2,
          propertymanager_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content:
            "I would like to schedule a viewing for the upcoming weekend.",
          guest_id: 3,
          propertymanager_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("messages", null, {});
  },
};
