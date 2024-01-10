const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_connection');

const WorkingDays = sequelize().define(
    'tbl_workingdays',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        working_days: {
            type: DataTypes.INTEGER,
            defaultValue: 30,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        schema: 'master',
        tableName: 'tbl_workingdays',
    }
);

module.exports = WorkingDays;
