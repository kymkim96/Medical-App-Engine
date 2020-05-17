module.exports = (sequelize, DataTypes) => {
    return sequelize.define('subjects', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};