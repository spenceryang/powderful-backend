"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "propertymanagers",
      [
        {
          name: "Takashi Kobayashi",
          email: "takashi.kobayashi@example.com",
          phone: "+81-123-4567",
          password: bcrypt.hashSync("securePassword123", 10),
          description:
            "Experienced manager of ski and snowboard rental shops in Niseko, with a deep knowledge of the local snow sports scene.",
          totalbookings: 150,
          occupancyrate: 90,
          revenue: 1000000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Yui Tanaka",
          email: "yui.tanaka@example.com",
          phone: "+81-765-4321",
          password: bcrypt.hashSync("anotherGreatPassword!", 10),
          description:
            "Dedicated to providing the best gear for powder days in Niseko, ensuring every customer has the perfect setup for the slopes.",
          totalbookings: 200,
          occupancyrate: 95,
          revenue: 1200000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Hiroshi Sato",
          email: "hiroshi.sato@example.com",
          phone: "+81-555-5555",
          password: bcrypt.hashSync("uniquePassword#1234", 10),
          description:
            "Offers top-of-the-line ski and snowboard equipment for enthusiasts looking to tackle Niseko’s famous powder snow.",
          totalbookings: 250,
          occupancyrate: 85,
          revenue: 900000,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("propertymanagers", null, {});
  },
};
