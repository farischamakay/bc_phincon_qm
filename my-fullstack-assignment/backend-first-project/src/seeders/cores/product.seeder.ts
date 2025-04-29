import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { platform } from "os";

export default {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    let products = [
      {
        id: uuidv4(),
        name: "Product 1",
        price: 10000,
        category: "Category 1",
        stock: 10,
        data: JSON.stringify({ platforms: ["Sample details"] }),
      },
      {
        id: uuidv4(),
        name: "Product 2",
        price: 20000,
        category: "Category 2",
        stock: 20,
        data: JSON.stringify({ platforms: ["Sample details"] }),
      },
      {
        id: uuidv4(),
        name: "Product 3",
        price: 30000,
        category: "Category 3",
        stock: 30,
        data: JSON.stringify({ platforms: ["Sample details"] }),
      },
      {
        id: uuidv4(),
        name: "Product 4",
        price: 40000,
        category: "Category 4",
        stock: 40,
        data: JSON.stringify({ platforms: ["Sample details"] }),
      },
      {
        id: uuidv4(),
        name: "Product 5",
        price: 50000,
        category: "Category 5",
        stock: 50,
        data: JSON.stringify({ platforms: ["Sample details"] }),
      },
    ];

    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete("products", {});
  },
};
