import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
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
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("categories", {});
    },
};
