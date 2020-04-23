module.exports = (sequelize, DataTypes) => {
    return sequelize.define('diseases', {
        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};