const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // misma carpeta que db.js

const Huesped = sequelize.define('Huesped', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false}
  
}, {
  tableName: 'Huesped',
  timestamps: false
});

module.exports = Huesped;