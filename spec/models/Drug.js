module.exports = (sequelize, DataTypes) => {
    return sequelize.define('drugs', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};