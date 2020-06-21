const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const diseases = sequelize.define(
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
  sequelizePaginate.paginate(diseases);
  return diseases;
};
