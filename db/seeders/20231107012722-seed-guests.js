"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);

    await queryInterface.bulkInsert(
      "guests",
      [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          password: await bcrypt.hash("newPassword123", salt),
          phone: "123-456-7890",
          description:
            "Passionate snowboarder seeking challenging slopes and lively après-ski scenes.",
          preferences: "ski-in-out,hot-tub",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          password: await bcrypt.hash("anotherSecurePassword!", salt),
          phone: "098-765-4321",
          description:
            "Avid skier looking for family-friendly resorts with diverse runs.",
          preferences: "mountain-view,ski-school",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          password: await bcrypt.hash("differentSecret123", salt),
          phone: "555-555-5555",
          description:
            "Snowboard enthusiast interested in backcountry trails and powder-rich terrains.",
          preferences: "snowboard-rental,guide-service",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("guests", null, {});
  },
};
