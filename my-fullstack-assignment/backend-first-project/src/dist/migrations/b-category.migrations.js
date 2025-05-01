import { DataTypes } from "sequelize";
export default {
    up: async (queryInterface) => {
        await queryInterface.createTable("categories", {
            categoryId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            title: {
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
