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
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      images: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      part: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
