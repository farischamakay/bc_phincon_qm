import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        const users = await queryInterface.sequelize.query(`SELECT userId FROM users;`);
        const products = await queryInterface.sequelize.query(`SELECT productId, price FROM products;`);
        let carts = [];
        users[0]?.map((user, userIndex) => {
            products[0]?.slice(0, 2).map((product, productIndex) => {
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
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("carts", {});
    },
};
