module.exports = (sequelize, DataTypes) => {
    return sequelize.define('symptoms', {
        symptom: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};