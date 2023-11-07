"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "payments",
      [
        {
          booking_id: 1,
          amount: 200,
          payment_date: new Date(),
          payment_type: "Credit Card",
          status: "Completed",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          booking_id: 1,
          amount: 150,
          payment_date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
          payment_type: "PayPal",
          status: "Pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          booking_id: 2,
          amount: 500,
          payment_date: new Date(new Date().setDate(new Date().getDate() - 2)), // Two days ago
          payment_type: "Bank Transfer",
          status: "Failed",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("payments", null, {});
  },
};
