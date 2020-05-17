module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "diseases",
    {
      code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      images: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      cure: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
