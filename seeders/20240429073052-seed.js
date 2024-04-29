"use strict";
const { hasPass } = require("../helpers");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/user.json").map((user) => {
      user.password = hasPass(user.password);
      user.createdAt = user.updatedAt = new Date();
      return user;
    });

    const product = require("../data/product.json").map((product) => {
      product.createdAt = product.updatedAt = new Date();
      return product;
    });

    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Products", product, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Products", null, {});
  },
};
