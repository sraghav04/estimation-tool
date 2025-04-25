const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
/* Choose the environment. */
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.config')[env];

const db = {};
const FILE_EXTENSION_LENGTH = -3;

/* This is a way to connect to the database. */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/* Reading all the files in the current directory, filtering out the files that are not .js files, and then requiring them. */
fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(FILE_EXTENSION_LENGTH) === '.js',
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

/* This is a way to associate the models with each other. */
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
