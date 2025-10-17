const SequelizeImport = require('sequelize');
const Sequelize = SequelizeImport.Sequelize || SequelizeImport.default;

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false,
});

module.exports = sequelize;
