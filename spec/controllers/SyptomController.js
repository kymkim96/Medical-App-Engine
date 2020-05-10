const { Symptoms } = require('../models');

exports.create = async (req, res, next) => {
    try {
        const symptom = await Symptoms.create({
            ...req.body,
        });

        res.send(symptom);
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.list = (req, res) => {
    res.send();
};

//부위별 증상 조회
exports.symptom = async (req, res, next) => {
    const { symptom_part } = req.query;

    try {
        if (symptom_part) {
            const symptom = await Symptoms.findAll({
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