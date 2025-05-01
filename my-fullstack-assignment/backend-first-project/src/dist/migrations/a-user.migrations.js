import { DataTypes } from "sequelize";
export default {
    up: async (queryInterface) => {
        await queryInterface.createTable("users", {
            userId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("users");
    },
};
export function up(queryInterface) {
    throw new Error("Function not implemented.");
}
