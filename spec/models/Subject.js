module.exports = (sequelize, DataTypes) => {
    return sequelize.define('subjects', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};