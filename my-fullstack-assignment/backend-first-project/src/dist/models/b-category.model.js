import { Model, DataTypes } from "sequelize";
export default (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                foreignKey: "categoryId",
            });
        }
    }
    Category.init({
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
    }, {
        sequelize,
        modelName: "Category",
        tableName: "categories",
    });
    return Category;
};
