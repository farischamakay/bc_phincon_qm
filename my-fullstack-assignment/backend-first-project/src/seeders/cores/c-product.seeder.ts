import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { platform } from "os";

export default {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT categoryId FROM categories;`
    );
    let products: {
      productId: string;
      name: string;
      price: number;
      categoryId: string;
      stock: number;
      data: any;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];

    categories[0]?.map((category: any, index: number) => {
      products.push({
        productId: uuidv4(),
        name: `Product ${index + 1}`,
        price: Math.floor(Math.random() * 1000) + 1,
        categoryId: category.categoryId,
        stock: index + 1,
        data: JSON.stringify({ platforms: ["Sample details"] }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete("products", {});
  },
};
