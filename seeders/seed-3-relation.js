"use strict";

exports.up = (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.bulkInsert("diseases_parts", [
            {
                diseaseId: 1,
                partId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 2,
                partId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 3,
                partId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]),
        queryInterface.bulkInsert("diseases_symptoms", [
            {
                diseaseId: 1,
                symptomId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 1,
                symptomId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 1,
                symptomId: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 2,
                symptomId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 2,
                symptomId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 2,
                symptomId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 3,
                symptomId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 3,
                symptomId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 3,
                symptomId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 4,
                symptomId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 4,
                symptomId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 4,
                symptomId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 4,
                symptomId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 5,
                symptomId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 5,
                symptomId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 5,
                symptomId: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 6,
                symptomId: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]),
        queryInterface.bulkInsert("diseases_subjects", [
            {
                diseaseId: 1,
                subjectId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                diseaseId: 2,
                subjectId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]),
    ]);
};
