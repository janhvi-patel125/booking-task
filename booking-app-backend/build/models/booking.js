"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Booking.js
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
class Booking extends sequelize_1.Model {
}
Booking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Assumes a User model/table exists
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    customer_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    customer_email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    booking_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    booking_type: {
        type: sequelize_1.DataTypes.ENUM('Full Day', 'Half Day', 'Custom'),
        allowNull: false,
    },
    booking_slot: {
        type: sequelize_1.DataTypes.ENUM('First Half', 'Second Half'),
        allowNull: true,
    },
    booking_time: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: dbConnection_1.default,
    modelName: 'Booking',
    tableName: 'Bookings',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['booking_date', 'booking_type', 'booking_slot', 'booking_time'],
        },
    ],
});
exports.default = Booking;
//# sourceMappingURL=booking.js.map