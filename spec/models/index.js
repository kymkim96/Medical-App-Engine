const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// TODO: 스키마 연결해주시면 됩니당
db.Subjects = require('./subjects')(sequelize, Sequelize);
db.Diseases = require('./diseases')(sequelize, Sequelize);
db.Symptoms = require('./symptoms')(sequelize, Sequelize);

// TODO: 릴레이션도 만들어주시면 감사합니당
db.Subjects.hasMany(db.Diseases, { foreignKey: 'subject', sourceKey: 'id'});
db.Diseases.belongsTo(db.Subjects, { foreignKey: 'subject', sourceKey: 'id'});

db.Diseases.belongsToMany(db.Symptoms, { through: 'Takes'});
db.Symptoms.belongsToMany(db.Diseases, { through: 'Takes'});

module.exports = db;