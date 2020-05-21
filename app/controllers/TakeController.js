/*
const { Disease, Symptom } = require('../models');

exports.take = async (req, res, next) => {
    //req에서 disease랑 symptom 분리하는법을 찾아야함
    const { disease_id, symptom_id } = req.body;

    try {
        if (!disease_id) {
            res.status(400).send({ message: "해당 질병이 존재하지 않습니다." });
        }
        if (!symptom_id) {
            res.status(400).send({ message: '해당 증상이 존재하지 않습니다.'});
        }

        const disease = await Disease.findOne({
            where: {
                id: disease_id
            }
        });
        const symptom = await Symptom.findOne({
            where: {
                id: symptom_id
            }
        });
        disease.addSymptoms(symptom);
        res.status(200);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
*/