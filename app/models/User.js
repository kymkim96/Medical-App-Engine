module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING(),
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
    });
};