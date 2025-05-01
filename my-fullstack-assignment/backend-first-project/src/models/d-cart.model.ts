import { Model, DataTypes, Sequelize } from "sequelize";
import { CartModel } from "../types/cart.type.js";

export default (sequelize: Sequelize) => {
  class Cart extends Model<CartModel> {
    static associate(models: any) {
      Cart.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "products",
      });

      Cart.belongsTo(models.User, {
        foreignKey: "cartId",
        as: "users",
      });
    }
  }

  Cart.init(
    {
      cartId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
    }
  );

  return Cart;
};
