"use strict";

exports.up = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.bulkInsert("diseases", [
      {
        code: "A00",
        name: "콜레라",
        description:
            "Vibrio cholerae 박테리아의 일부 균주에 의한 소장의 감염입니다.",
        images:
            "https://w.namu.la/s/ec96236cf2e8add5286b08da1e50c14be4aed9aab7a4802e0790672cf27160a734972fc20967a692e78791afd0989d223863dc13b134d2bed92d4db93d260450d790e369df1e7329e05d4f9c5771dc76fcaf0a6785720c02b9cee790c9f8337f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "B00",
        name: "헤르페스 바이러스 감염",
        description:
            "헤르페스 바이러스는 인간을 포함한 동물에서 감염과 특정 질병을 유발하는 DNA 바이러스의 큰 계열입니다.",
        images:
            "https://w.namu.la/s/ec96236cf2e8add5286b08da1e50c14be4aed9aab7a4802e0790672cf27160a734972fc20967a692e78791afd0989d223863dc13b134d2bed92d4db93d260450d790e369df1e7329e05d4f9c5771dc76fcaf0a6785720c02b9cee790c9f8337f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 1",
        name: "질병 1",
        description:
            "Vibrio cholerae 박테리아의 일부 균주에 의한 소장의 감염입니다.",
        images:
            "https://w.namu.la/s/ec96236cf2e8add5286b08da1e50c14be4aed9aab7a4802e0790672cf27160a734972fc20967a692e78791afd0989d223863dc13b134d2bed92d4db93d260450d790e369df1e7329e05d4f9c5771dc76fcaf0a6785720c02b9cee790c9f8337f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 2",
        name: "질병 2",
        description:
            "헤르페스 바이러스는 인간을 포함한 동물에서 감염과 특정 질병을 유발하는 DNA 바이러스의 큰 계열입니다.",
        images:
            "https://w.namu.la/s/ec96236cf2e8add5286b08da1e50c14be4aed9aab7a4802e0790672cf27160a734972fc20967a692e78791afd0989d223863dc13b134d2bed92d4db93d260450d790e369df1e7329e05d4f9c5771dc76fcaf0a6785720c02b9cee790c9f8337f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 3",
        name: "질병 3",
        description:
            "Vibrio cholerae 박테리아의 일부 균주에 의한 소장의 감염입니다.",
        images:
            "https://w.namu.la/s/ec96236cf2e8add5286b08da1e50c14be4aed9aab7a4802e0790672cf27160a734972fc20967a692e78791afd0989d223863dc13b134d2bed92d4db93d260450d790e369df1e7329e05d4f9c5771dc76fcaf0a6785720c02b9cee790c9f8337f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "질병코드 4",
        name: "질병 4",
        description:
            "헤르페스 바이러스는 인간을 포함한 동물에서 감염과 특정 질병을 유발하는 DNA 바이러스의 큰 계열입니다.",
        images:
            "https://w.namu.la/s/ec96236cf2e8add5286b08da1e50c14be4aed9aab7a4802e0790672cf27160a734972fc20967a692e78791afd0989d223863dc13b134d2bed92d4db93d260450d790e369df1e7329e05d4f9c5771dc76fcaf0a6785720c02b9cee790c9f8337f",
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
    ]),
    queryInterface.bulkInsert("symptoms", [
      {
        name: "머리가 아프다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "목이 따갑다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "배가 아프다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "눈이 따갑다",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  ]);
};
