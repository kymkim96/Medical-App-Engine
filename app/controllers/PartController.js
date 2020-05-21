require("dotenv");
const { Part, Disease, Symptom } = require("../models");

exports.register = async (req, res, next) => {
    const requestBody = req.body;

    try {
        let exPart;
        exPart = await Part.create({
            ...requestBody["content"],
        });

        const part = await Part.findOne({
            where: { id: exDrug.id },
        });
        res.json(part);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.read = async (req, res, next) => {
    const { id } = req.params;

    try {
        const part = await Part.findOne({
            where: { id, deletedAt: null },
            include: [Disease, Symptom],
        });
        res.json(part);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.list = async (req, res, next) => {
    const { keyword } = req.query;
    let { page, count } = req.query;

    page = page ? parseInt(page) : 1;
    count = count ? parseInt(count) : 5;

    try {
        const parts = keyword
        await Part.findAll({
            where: {
                deletedAt: null,
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
                offset: count * (page - 1),
                limit: count,
            });

        if (!parts) {
            res.status(400).send({ message: "해당 부위가 존재하지 않습니다." });
            return;
        }

        res.send(ㅔㅁㄳs);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    const requestBody = req.body;

    try {
        let exPart;
        exPart = await Part.findOne({
            where: { id },
        });

        await Part.update(
            {
                ...requestBody[content],
            },
            {
                where: { id },
            }
        );

        const part = await Part.findOne({
            where: { id },
        });
        res.json(part);
    } catch (error) {
        res.json(error);
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    const { id } = req.params;

    try {
        const part = await Part.findOne({ where: { id } });

        const diseases = await part.getDiseases();
        await part.removeDiseases(diseases);

        const symptoms = await part.getSymptoms();
        await part.removeDiseases(symptoms);

        await Part.destroy({
            where: { id },
        });

        res.json({ message: "부위가 삭제되었습니다." });
    } catch (error) {
        res.json(error);
        next(error);
    }
};