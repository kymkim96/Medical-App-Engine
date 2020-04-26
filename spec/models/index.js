const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Subjects = require('./subjects')(sequelize, Sequelize);
db.Diseases = require('./diseases')(sequelize, Sequelize);
db.Symptoms = require('./symptoms')(sequelize, Sequelize);

db.Subjects.belongsToMany(db.Diseases, { through: 'Treatment'});
db.Diseases.belongsToMany(db.Subjects, { through: 'Treatment'});

db.Diseases.belongsToMany(db.Symptoms, { through: 'Take'});
db.Symptoms.belongsToMany(db.Diseases, { through: 'Take'});

module.exports = db;