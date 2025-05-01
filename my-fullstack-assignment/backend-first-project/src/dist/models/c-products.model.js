import { Model, DataTypes } from "sequelize";
export default (sequelize) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: "categoryId",
                as: "category",
            });
            Product.belongsToMany(models.User, {
                through: models.Cart,
                foreignKey: "productId",
                as: "users",
            });
        }
    }
    Product.init({
        productId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Product",
        tableName: "products",
    });
    return Product;
};
