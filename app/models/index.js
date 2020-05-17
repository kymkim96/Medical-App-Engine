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
db.Part = require('./Part')(sequelize, Sequelize);

db.Disease.hasMany(db.Disease, { sourceKey: 'id', foreignKey: 'parent_id' });

db.Disease.belongsToMany(db.Subject, { through: 'diseases_subjects'});
db.Subject.belongsToMany(db.Disease, { through: 'diseases_subjects'});

db.Disease.belongsToMany(db.Symptom, { through: 'diseases_symptoms'});
db.Symptom.belongsToMany(db.Disease, { through: 'diseases_symptoms'});

db.Disease.belongsToMany(db.Drug, { through: 'diseases_drugs' });
db.Drug.belongsToMany(db.Disease, { through: 'diseases_drugs' });

db.Disease.belongsToMany(db.Part, { through: 'diseases_parts'});
db.Part.belongsToMany(db.Disease, { through: 'diseases_parts'});

db.Symptom.belongsToMany(db.Part, { through: 'symptoms_parts'});
db.Part.belongsToMany(db.Symptom, { through: 'symptoms_parts'});

module.exports = db;