require("dotenv");
const { Drug, Disease } = require("../models");

exports.register = async (req, res, next) => {
    const requestBody = req.body;

    try {
        let exDrug;
        exDrug = await Drug.create({
            ...requestBody["content"],
        });

        const drug = await Drug.findOne({
            where: { id: exDrug.id },
        });
        res.json(drug);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.read = async (req, res, next) => {
    const { id } = req.params;

    try {
        const drug = await Drug.findOne({
            where: { id, deletedAt: null },
            include: [Disease],
        });
        res.json(drug);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    const requestBody = req.body;

    try {
        let exDrug;
        exDrug = await Drug.findOne({
            where: { id },
        });

        await Drug.update(
            {
                ...requestBody[content],
            },
            {
                where: { id },
            }
        );

        const drug = await Drug.findOne({
            where: { id },
        });
        res.json(drug);
    } catch (error) {
        res.json(error);
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    const { id } = req.params;

    try {
        const drug = await Drug.findOne({ where: { id } });

        const diseases = await drug.getDiseases();
        await drug.removeDiseases(diseases);

        await Drug.destroy({
            where: { id },
        });

        res.json({ message: "약이 삭제되었습니다." });
    } catch (error) {
        res.json(error);
        next(error);
    }
};