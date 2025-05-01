import { Model, DataTypes } from "sequelize";
export default (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Product, {
                through: models.Cart,
                foreignKey: "productId",
                as: "product",
            });
        }
    }
    User.init({
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
    });
    return User;
};
