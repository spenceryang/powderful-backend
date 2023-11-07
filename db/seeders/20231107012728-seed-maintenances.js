"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "maintenances",
      [
        {
          description: "Air conditioning repair.",
          scheduled_date: new Date(
            new Date().setDate(new Date().getDate() + 7)
          ),
          status: "scheduled",
          property_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Routine plumbing check.",
          scheduled_date: new Date(
            new Date().setDate(new Date().getDate() + 14)
          ),
          status: "scheduled",
          property_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: "Painting common areas.",
          scheduled_date: new Date(
            new Date().setDate(new Date().getDate() + 21)
          ),
          status: "pending",
          property_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("maintenances", null, {});
  },
};
