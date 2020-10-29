module.exports = (sequelize, DataTypes) => {
    return sequelize.define('drugs', {
        name: {
            type: DataTypes.STRING(),
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
        side_effects: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    });
};