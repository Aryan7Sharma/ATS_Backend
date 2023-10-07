const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_connection');

const LoginCredentials = sequelize().define(
  'tbl_login_credentials',
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    hash_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imei_no: { 
      type: DataTypes.BIGINT, 
      allowNull: false,
      defaultValue:0,
    },
    user_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emp_status: {
      type: DataTypes.INTEGER,
      defaultValue:1,
    },
  },
  {
    timestamps: false,
    schema: 'master',
    tableName: 'tbl_login_credentials',
  }
);


module.exports = LoginCredentials;
