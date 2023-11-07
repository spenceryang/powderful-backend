"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "property_assets",
      [
        // Assets for Niseko Powder Haven
        {
          property_id: 1,
          file_link: "images/properties/niseko-powder-haven-1.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          property_id: 1,
          file_link: "images/properties/niseko-powder-haven-2.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Assets for The Alpine Escape
        {
          property_id: 2,
          file_link: "images/properties/alpine-escape-1.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          property_id: 2,
          file_link: "images/properties/alpine-escape-2.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Assets for Snowboarder’s Retreat
        {
          property_id: 3,
          file_link: "images/properties/snowboarders-retreat-1.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          property_id: 3,
          file_link: "images/properties/snowboarders-retreat-2.jpg",
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
