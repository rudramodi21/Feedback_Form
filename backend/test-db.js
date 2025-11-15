//For MySQL/SQLite
const { sequelize } = require('./config/db');
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database Connected Successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection Failed:', err);
    process.exit(1);
  });
