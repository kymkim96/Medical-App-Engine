const { Symptom, Part, Disease } = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");

exports.fetchSymptomsOfPart = async (req, part_id_list) => {
    let { keyword, page, count } = req.query;

    if (!page) {
        page = 1;
    }
    if (!count) {
        count = 5;
    }
    const symptoms = keyword
        ? await Symptom.findAll({
            where: {
                deletedAt: null,
                name: {
                    [Op.like]: `%${keyword}%`,
                },
            },
            offset: count * (page -1),
            limit: count,
            include: [Part, Disease],
        })
    : await Symptom.findAll({
        where: {
            deletedAt: null,
        },
        offset: count * (page - 1),
        limit: count,
        include: [Part, Disease],
    });

    if (!symptoms) {
        return false;
    }

    const symptom_list = [];
    for (let symptom of symptoms) {
        const parts = await symptom.getParts({
            where: {
                id: part_id_list,
            },
        });
        if (parts && parts.length === part_id_list.length) {
            symptom_list.push(symptom)
        }
    }

    const result = _.orderBy(symptom_list, ["parts.length"], ["asc"]);

    return result;
};