"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "property_assets",
      [
        // Assets for Niseko Powder Haven
        {
          property_id: 1,
          file_link:
            "https://images.pexels.com/photos/3717517/pexels-photo-3717517.jpeg",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Assets for The Alpine Escape
        {
          property_id: 2,
          file_link:
            "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Assets for Snowboarder’s Retreat

        {
          property_id: 3,
          file_link:
            "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("property_assets", null, {});
  },
};
