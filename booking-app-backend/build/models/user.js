"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    is_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: dbConnection_1.default,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=user.js.map