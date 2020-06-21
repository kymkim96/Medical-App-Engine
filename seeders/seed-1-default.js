"use strict";
const bcrypt = require('bcrypt');

exports.up = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.bulkInsert("users", [
      {
        nickname: 'admin',
        password: bcrypt.hashSync('adm!n1', 12),
        role: 'super-admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    queryInterface.bulkInsert("diseases", [
      {
        code: "A00",
        name: "콜레라",
        description:
            "Vibrio cholerae 박테리아의 일부 균주에 의한 소장의 감염입니다.",
        cure: "구충제 먹기",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "B00",
        name: "헤르페스 바이러스 감염",
        description:
            "헤르페스 바이러스는 인간을 포함한 동물에서 감염과 특정 질병을 유발하는 DNA 바이러스의 큰 계열입니다.",
        cure: "백신 처방",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 1",
        name: "질병 1",
        description:
            "Vibrio cholerae 박테리아의 일부 균주에 의한 소장의 감염입니다.",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 2",
        name: "질병 2",
        description:
            "헤르페스 바이러스는 인간을 포함한 동물에서 감염과 특정 질병을 유발하는 DNA 바이러스의 큰 계열입니다.",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 3",
        name: "질병 3",
        description:
            "Vibrio cholerae 박테리아의 일부 균주에 의한 소장의 감염입니다.",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 4",
        name: "질병 4",
        description:
            "헤르페스 바이러스는 인간을 포함한 동물에서 감염과 특정 질병을 유발하는 DNA 바이러스의 큰 계열입니다.",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    queryInterface.bulkInsert("parts", [
      {
        name: "머리",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "목",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "배",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "눈",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    queryInterface.bulkInsert("subjects", [
      {
        name: "내과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "이비인후과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "외과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "가정의학과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "정형외과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "흉부외과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "치과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "안과",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  ]);
};
