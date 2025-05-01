import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    let categories = [
      {
        categoryId: uuidv4(),
        title: "Category 1",
      },
      {
        categoryId: uuidv4(),
        title: "Category 2",
      },
      {
        categoryId: uuidv4(),
        title: "Category 3",
      },
      {
        categoryId: uuidv4(),
        title: "Category 4",
      },
      {
        categoryId: uuidv4(),
        title: "Category 5",
      },
    ];

    await queryInterface.bulkInsert("categories", categories, {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete("categories", {});
  },
};
