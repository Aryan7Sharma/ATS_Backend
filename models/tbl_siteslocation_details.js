const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_connection');

const SitesLocationDetails = sequelize().define(
  'tbl_siteslocation_details',
  {
    location_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    schema: 'public',
    tableName: 'tbl_siteslocation_details',
  }
);

module.exports = SitesLocationDetails;
