require("dotenv");
const { Disease, Subject } = require("../models");

exports.register = async (req, res, next) => {
    const requestBody = req.body;

    try {
        let exSubject;
        exSubject = await Subject.create({
            ...requestBody["content"],
        });

        const subject = await Subject.findOne({
            where: { id: exDrug.id },
        });
        res.json(subject);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.read = async (req, res, next) => {
    const { id } = req.params;

    try {
        const subject = await Subject.findOne({
            where: { id, deletedAt: null },
            include: [Disease],
        });
        res.json(subject);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    const requestBody = req.body;

    try {
        let exSubject;
        exSubject = await Subject.findOne({
            where: { id },
        });

        await Subject.update(
            {
                ...requestBody[content],
            },
            {
                where: { id },
            }
        );

        const subject = await Subject.findOne({
            where: { id },
        });
        res.json(subject);
    } catch (error) {
        res.json(error);
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    const { id } = req.params;

    try {
        const subject = await Subject.findOne({ where: { id } });

        const diseases = await subject.getDiseases();
        await subject.removeDiseases(diseases);

        await Subject.destroy({
            where: { id },
        });

        res.json({ message: "부위가 삭제되었습니다." });
    } catch (error) {
        res.json(error);
        next(error);
    }
};