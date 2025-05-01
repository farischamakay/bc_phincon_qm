import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        const categories = await queryInterface.sequelize.query(`SELECT categoryId FROM categories;`);
        let products = [];
        categories[0]?.map((category, index) => {
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
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", {});
    },
};
