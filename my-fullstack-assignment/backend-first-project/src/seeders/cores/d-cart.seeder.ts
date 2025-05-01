import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT userId FROM users;`
    );
    const products = await queryInterface.sequelize.query(
      `SELECT productId, price FROM products;`
    );

    let carts: {
      cartId: string;
      userId: string;
      productId: string;
      qty: number;
      totalPrice: number;
      data: any;
    }[] = [];

    users[0]?.map((user: any, userIndex: number) => {
      products[0]?.slice(0, 2).map((product: any, productIndex: number) => {
        const qty = productIndex + 1;
        carts.push({
          cartId: uuidv4(),
          userId: user.userId,
          productId: product.productId,
          qty,
          totalPrice: qty * product.price,
          data: JSON.stringify({ platforms: ["Sample details"] }),
        });
      });
    });

    await queryInterface.bulkInsert("carts", carts, {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete("carts", {});
  },
};
