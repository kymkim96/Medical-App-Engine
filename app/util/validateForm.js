const { Disease, Symptom, Part, Drug, Subject } = require("../models");
const { Op } = require('sequelize');

exports.validateFormRegisterDisease = async (req, res) => {
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

  // const existDisease = await Disease.findOne({
  //   where: {
  //     [Op.or]: [ { name }, { code } ],
  //   },
  // });
  //
  // if (existDisease) {
  //   res.status(400).json({
  //     message: "이미 존재하는 질병입니다.",
  //   });
  //   return false;
  // }

  return true;
};

exports.validateFormRegisterSymptom = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "name은 비어있어선 안됩니다.",
    });
    return false;
  }

  return true;
};

exports.validateFormRegisterPart = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "name은 비어있어선 안됩니다.",
    });
    return false;
  }

  const existPart = await Part.findOne({
    where: {
      name,
    },
  });

  if (existPart) {
    res.status(400).json({
      message: "이미 존재하는 증상입니다.",
    });
    return false;
  }

  return true;
};

exports.validateFormRegisterDrug = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "name은 비어있어선 안됩니다.",
    });
    return false;
  }

  const existDrug = await Drug.findOne({
    where: {
      name,
    },
  });

  if (existDrug) {
    res.status(400).json({
      message: "이미 존재하는 증상입니다.",
    });
    return false;
  }

  return true;
};

exports.validateFormRegisterSubject = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "name은 비어있어선 안됩니다.",
    });
    return false;
  }

  const existSubject = await Subject.findOne({
    where: {
      name,
    },
  });

  if (existSubject) {
    res.status(400).json({
      message: "이미 존재하는 증상입니다.",
    });
    return false;
  }

  return true;
};
