"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "favorites",
      [
        {
          guest_id: 1,
          property_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          guest_id: 2,
          property_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          guest_id: 3,
          property_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("favorites", null, {});
  },
};
