import { Model, DataTypes, Sequelize } from "sequelize";
import { CategoryModel } from "../types/category.type.js";

export default (sequelize: Sequelize) => {
  class Category extends Model<CategoryModel> {
    static associate(models: any) {
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
      });
    }
  }

  Category.init(
    {
      categoryId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
    }
  );

  return Category;
};
