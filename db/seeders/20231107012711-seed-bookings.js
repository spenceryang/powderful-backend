"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bookings",
      [
        {
          guest_id: 1,
          property_id: 2,
          start_date: new Date(2023, 11, 15),
          end_date: new Date(2023, 11, 20),
          booking_status: "confirmed",
          payment_status: "paid",
          review_of_guest: 4,
          review_of_property: 5,
          comment_of_guest: "Lovely place, had a great time!",
          comment_of_property: "Guest was very respectful and tidy.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          guest_id: 2,
          property_id: 3,
          start_date: new Date(2023, 11, 22),
          end_date: new Date(2023, 11, 27),
          booking_status: "pending",
          payment_status: "unpaid",
          review_of_guest: 3,
          review_of_property: 4,
          comment_of_guest: "Comfortable stay, will book again.",
          comment_of_property: "Guest left the place in good condition.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          guest_id: 3,
          property_id: 1,
          start_date: new Date(2023, 12, 5),
          end_date: new Date(2023, 12, 10),
          booking_status: "cancelled",
          payment_status: "refunded",
          review_of_guest: 5,
          review_of_property: null,
          comment_of_guest:
            "Had to cancel due to personal reasons, no issues with the process.",
          comment_of_property: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};
