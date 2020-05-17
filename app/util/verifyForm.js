const { Disease } = require("../models");
const { Op } = require('sequelize');

exports.verifyFormRegisterDisease = async (req, res) => {
  const { code, name } = req.body.content;

  if (!code) {
    res.status(400).json({
      message: "code는 비어있어선 안됩니다.",
    });
    return false;
  }

  if (!name) {
    res.status(400).json({
      message: "name은 비어있어선 안됩니다.",
    });
    return false;
  }

  const exDisease = await Disease.findOne({
    where: {
      [Op.or]: [ { name }, { code } ],
    },
  });

  if (exDisease) {
    res.status(400).json({
      message: "이미 존재하는 질병입니다.",
    });
    return false;
  }

  return true;
};
