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

