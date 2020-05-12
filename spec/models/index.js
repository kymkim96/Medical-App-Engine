const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Subject = require('./Subject')(sequelize, Sequelize);
db.Disease = require('./Disease')(sequelize, Sequelize);
db.Symptom = require('./Symptom')(sequelize, Sequelize);
db.Drug = require('./Drug')(sequelize, Sequelize);
db.Treatment = require('./Treatment')(sequelize, Sequelize);

db.Disease.belongsToMany(db.Subject, { through: 'Clinic'});
db.Subject.belongsToMany(db.Disease, { through: 'Clinic'});

db.Disease.belongsToMany(db.Symptom, { through: 'Take'});
db.Symptom.belongsToMany(db.Disease, { through: 'Take'});

db.Disease.belongsToMany(db.Drug, { through: 'Prescription' });
db.Drug.belongsToMany(db.Disease, { through: 'Prescription' });

db.Disease.belongsToMany(db.Treatment, { through: 'Remedy' });
db.Treatment.belongsToMany(db.Disease, { through: 'Remedy' });

module.exports = db;