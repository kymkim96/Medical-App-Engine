module.exports = (sequelize, DataTypes) => {
    return sequelize.define('symptoms', {
        symptom: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        part: {
            type: DataTypes.STRING(10),
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
    });
};