import { v4 as uuidv4 } from "uuid";
export default {
    async up(queryInterface, Sequelize) {
        let users = [
            {
                userId: uuidv4(),
                username: "User 1",
                email: "user1@example.com",
            },
            {
                userId: uuidv4(),
                username: "User 2",
                email: "user2@example.com",
            },
            {
                userId: uuidv4(),
                username: "User 3",
                email: "user3@example.com",
            },
            {
                userId: uuidv4(),
                username: "User 4",
                email: "user4@example.com",
            },
            {
                userId: uuidv4(),
                username: "User 5",
                email: "user5@example.com",
            },
        ];
        await queryInterface.bulkInsert("users", users, {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", {});
    },
};
