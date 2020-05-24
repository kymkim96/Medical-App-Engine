const { Disease, Symptom, Part, Subject, Drug } = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");

exports.fetchDiseasesOfSymptom = async (req, symptom_id_list) => {
  let { keyword, page, count } = req.query;

  if (!page) {
    page = 1;
  }
  if (!count) {
    count = 5;
  }
  // 질병 목록 출력
  const diseases = keyword
    ? await Disease.findAll({
        where: {
          deletedAt: null,
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        include: [Part, Symptom, Subject, Drug],
      })
    : await Disease.findAll({
        where: {
          deletedAt: null,
        },
        include: [Part, Symptom, Subject, Drug],
      });

  if (!diseases) {
    return false;
  }

  const disease_list = [];
  for (let disease of diseases) {
    const symptoms = await disease.getSymptoms({
      where: {
        id: symptom_id_list,
      },
    });
    if (symptoms && symptoms.length === symptom_id_list.length) {
      disease_list.push(disease);
    }
  }

  const result = _.orderBy(disease_list, ["symptoms.length"], ["asc"]);

  return result;
};
