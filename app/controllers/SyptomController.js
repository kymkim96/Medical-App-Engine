require("dotenv").config();
const { Op } = require("sequelize");
const { Symptom, Part } = require('../models');
const { fetchSymptomsOfPart } = require("../util/functionSymptom");

exports.register = async (req, res, next) => {
    const requestBody = req.body;

    try {
        let exSymptom;
        exSymptom = await Symptom.create({
            ...requestBody["content"],
        });

        for (let content in requestBody) {
            switch (content) {
                case "parts":
                    for (let part of requestBody[content]) {
                        const newPart = await Part.create({
                            ...part,
                        });
                        await exSymptom.addPart(newPart);
                    }
                    break;
                case "part_ids":
                    await exSymptom.addPart(requestBody[content]);
                    break;
            }
        }

        const symptom = await Symptom.findOne({
            where: {
                id: exSymptom.id,
            },
            include: [Part],
        });
        res.json(symptom);
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.read = async (req, res, next) => {
    const { id } = req.params;

    try { 
        const symptom = await Symptom.findOne({
            where: { id, deletedAt: null },
            include: [Part],
        });
        res.json(symptom);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.list = async (req, res, next) => {
    const { keyword, part_ids } = req.query;
    let { page, count } = req.query;
    const part_id_list = [];
    if (part_ids) {
        for (let part_id of part_ids) {
            part_id_list.push(parseInt(part_id));
        }
    }

    page = page ? parseInt(page) : 1;
    count = count ? parseInt(count) : 5;

    try {
        const symptoms = keyword
            ? part_ids
                ? await fetchSymptomsOfPart(req, part_id_list)
                : await Symptom.findAll({
                    where: {
                        deletedAt: null,
                        name: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                    offset: count * (page - 1),
                    limit: count,
                    include: [Part],
                })
            : part_ids
            ? await fetchSymptomsOfPart(req, part_id_list)
            : await Symptom.findAll({
                where: { deletedAt: null },
                offset: count * (page - 1),
                limit: count,
                include: [Part],
            });

        if (!symptoms) {
            res.status(400).send({ message: "해당 증상이 존재하지 않습니다." });
            return;
        }

        res.send(symptoms);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    const requestBody = req.body;

    try {
        let exSymptom;
        exSymptom = await Symptom.findOne({
            where: { id },
        });

        for (let content in requestBody) {
            switch (content) {
                case "content":
                    await Symptom.update(
                        {
                            ...requestBody[content],
                        },
                        {
                            where: { id },
                        }
                    );
                    break;
                case "parts":
                    for (let part of requestBody[content]) {
                        const newPart = await Part.create({
                            ...part,
                        });
                        await exSymptom.addPart(newPart);
                    }
                    break;
                case "part_ids":
                    const id_list_part = [];
                    const parts = await exSymptom.getParts();
                    for (let part of parts) {
                        id_list_part.push(part.id);
                    }
                    for (let id of requestBody[content]) {
                        if (!id_list_part.includes(id)) {
                            await exSymptom.addPart(id);
                        }
                    }

                    for (let id of id_list_part) {
                        if (!requestBody[content].includes(id)) {
                            await exSymptom.removePart(id);
                        }
                    }
                    break;
            }
        }

        const symptom = await Symptom.findOne({
            where: { id },
            include: [Part],
        });
        res.json(symptom);
    } catch (error) {
        res.json(error);
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    const { id } = req.params;

    try {
        const symptom = await Symptom.findOne({ where: { id } });

        const diseases = await symptom.getDiseases();
        await symptom.removeDisease(diseases);

        const parts = await symptom.getParts();
        await symptom.removePart(parts);

        await Symptom.destroy({
            where: { id },
        });

        res.json({ message: "증상이 삭제되었습니다." });
    } catch (error) {
        res.json(error);
        next(error);
    }
}

//부위별 증상 조회
/*
exports.symptom = async (req, res, next) => {
    const { symptom_part } = req.query;

    try {
        if (symptom_part) {
            const symptom = await Symptom.findAll({
                where: {
                    part: symptom_part
                },
            });

            if (!symptom) {
                res.status(400).send({ message: "해당 부위의 증상이 존재하지 않습니다." });
                return;
            }

            res.send(symptom);
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
};
*/