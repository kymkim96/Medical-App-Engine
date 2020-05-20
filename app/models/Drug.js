module.exports = (sequelize, DataTypes) => {
    return sequelize.define('drugs', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        ingredients: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};