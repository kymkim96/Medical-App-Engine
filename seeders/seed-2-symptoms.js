"use strict";
const bcrypt = require('bcrypt');

exports.up = (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.bulkInsert("symptoms", [
            {
                name: "편두통이 있다",
                partId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "두피가 따갑다",
                partId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "목이 따끔하다",
                partId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "목이 부었다",
                partId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "소화가 잘 안된다",
                partId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "체했다",
                partId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "눈이 따갑다",
                partId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "눈이 자주 충혈된다",
                partId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]),
    ]);
};
