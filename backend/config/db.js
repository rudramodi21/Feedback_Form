// backend/config/db.js
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite Database Connected');
    
    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database Synced');
  } catch (error) {
    console.error('❌ Unable to connect to SQLite:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };