import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("carts", {
      cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "productId",
        },
      },
      qty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("users");
  },
};

export function up(queryInterface: QueryInterface): any {
  throw new Error("Function not implemented.");
}
