"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "properties",
      [
        {
          propertymanager_id: 1,
          title: "Niseko Powder Haven",
          propertytype: "Cottage",
          configuration: "3BDR, 2BA",
          floorsize: "120m²",
          address:
            "190-1 Aza-Yamada, Kutchan, Abuta District, Hokkaido 044-0081, Japan",
          amenities: "Hot tub, Fireplace, Ski-in/Ski-out access",
          roomrate: 35000,
          coordinates: "42.8048° N, 140.6874° E",
          description:
            "A cozy cottage perfect for groups, with direct access to the best slopes and luxurious amenities for relaxing after a day in the snow.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          propertymanager_id: 2,
          title: "The Alpine Escape",
          propertytype: "Condo",
          configuration: "2BDR, 1BA",
          floorsize: "85m²",
          address:
            "167-3 Yamada, Kutchan, Abuta District, Hokkaido 044-0081, Japan",
          amenities: "Sauna, Ski equipment storage, Proximity to lifts",
          roomrate: 25000,
          coordinates: "42.8413° N, 140.6903° E",
          description:
            "Modern condo with a sauna and convenient storage for all your ski gear, just a stone’s throw away from the main lifts.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          propertymanager_id: 3,
          title: "Snowboarder’s Retreat",
          propertytype: "Apartment",
          configuration: "1BDR, 1BA",
          floorsize: "60m²",
          address:
            "132-29 Aza-Yamada, Kutchan, Abuta District, Hokkaido 044-0081, Japan",
          amenities:
            "Heated floors, Covered parking, Balcony with mountain view",
          roomrate: 20000,
          coordinates: "42.8594° N, 140.7043° E",
          description:
            "A snug apartment with heated floors for cold nights, offering a stunning balcony view to wake up to before hitting the slopes.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("properties", null, {});
  },
};
