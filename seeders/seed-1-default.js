"use strict";
const bcrypt = require("bcrypt");

exports.up = (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.bulkInsert("users", [
      {
        nickname: "admin",
        password: bcrypt.hashSync("adm!n1", 12),
        role: "super-admin",
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
        code: "D50",
        name: "철결핍빈혈",
        description:
          "빈혈이란 산소를 운반하는 성분인 헤모글로빈이 부족한 상태를 말하는데, 철결핍빈혈은 가장 흔한 빈혈 형태입니다.",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "E00",
        name: "선천성 요오드결핍증후군",
        description:
          "직접 또는 산모의 요오드부족의 결과로 환경성 요오드부족과 관련된 풍토병성 병태. 일부는 현존 갑상선기능저하증을 동반하지 않고 태아발달과정 중 갑상선호르몬의 부적절한 분비의 결과이다.",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "G00.0",
        name: "헤모필루스수막염",
        description:
          "b형 헤모필루스 인플루엔자",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "H10",
        name: "결막염",
        description:
          "",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "H60",
        name: "외이염",
        description:
            "외이도에 생기는 염증",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "I11",
        name: "고혈압성 심장병",
        description:
            "",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "J00",
        name: "급성 비인두염[감기]",
        description:
            "",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "K05",
        name: "치은염 및 치주 질환",
        description:
            "",
        cure: "이 병을 치료하기 위해선 병원에 가야합니다.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "K11.2",
        name: "타액선염",
        description:
            "",
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
        code: '01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "이비인후과",
        code: '13',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "외과",
        code: "04",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "가정의학과",
        code: "23",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "정형외과",
        code: "05",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "흉부외과",
        code: "07",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "치과",
        code: "49",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "안과",
        code: "12",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    queryInterface.bulkInsert("drugs", [
      {
        name: "타이레놀",
        description: "머리가 아플 때 먹는 약",
        ingredients: "주 성분 - ?",
        side_effects: "중독성",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "뉴클로정",
        description: "다음의 경증 또는 중등도통증의 완화 : 근육통, 신경통, 외상 후 및 수술 후 통증, 두통, 치통, 귀통증",
        ingredients: "주 성분 - ?",
        side_effects: "중독성",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "프라닥사캡슐",
        description: "<p>1. 비판막성 심방세동 환자에서 뇌졸중 및 전신색전증의 위험감소<br/>\n" +
            "2. 심재성 정맥혈전증 및 폐색전증의 치료<br/>\n" +
            "3. 심재성 정맥혈전증 및 폐색전증의 재발 위험 감소<br/></p>",
        ingredients: "주 성분 - ?",
        side_effects: "중독성",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "미피드정",
        description: "<p>1. 위궤양<br/>\n" +
            "2.다음 질환의 위점막병변(미란,출혈,발적,부종)의 개선 : 급성위염, 만성위염의 급성악화기</p>>\n",
        ingredients: "주 성분 - ?",
        side_effects: "중독성",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   name: "타이레놀",
      //   description: "머리가 아플 때 먹는 약",
      //   ingredients: "주 성분 - ?",
      //   side_effects: "중독성",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "타이레놀",
      //   description: "머리가 아플 때 먹는 약",
      //   ingredients: "주 성분 - ?",
      //   side_effects: "중독성",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "타이레놀",
      //   description: "머리가 아플 때 먹는 약",
      //   ingredients: "주 성분 - ?",
      //   side_effects: "중독성",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: "타이레놀",
      //   description: "머리가 아플 때 먹는 약",
      //   ingredients: "주 성분 - ?",
      //   side_effects: "중독성",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]),
  ]);
};
