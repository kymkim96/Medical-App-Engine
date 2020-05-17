module.exports = (sequelize, DataTypes) => {
    return sequelize.define('symptoms', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};