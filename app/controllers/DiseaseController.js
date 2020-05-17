require("dotenv").config();
const _ = require("lodash");
const axios = require("axios");
const { Op } = require("sequelize");
const { Disease, Symptom, Part, Subject, Drug } = require("../models");
const { verifyFormRegisterDisease } = require("../util/verifyForm");
const { fetchDiseasesOfSymptom } = require("../util/functionDisease");

/**
 * @swagger
 * /disease:
 *   post:
 *     tags:
 *     - Disease
 *     summary: 질병 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: 질병 이름
 *                   code:
 *                     type: string
 *                     description: 질병 코드
 *                   description:
 *                     type: string
 *                     description: 질병 내용
 *                   images:
 *                     type: string
 *                     description: 질병 관련 이미지
 *                   cure:
 *                     type: string
 *                     description: 치료법
 *               parts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 관련 부위
 *               part_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 관련 부위 id
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 증상명
 *               symptom_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 증상 id 리스트
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 진료과목 이름
 *               subject_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 증상 id 리스트
 *               drugs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 약물 이름
 *                     descriptions:
 *                       type: string
 *                       description: 약물 설명
 *                     ingredient:
 *                       type: string
 *                       description: 약물 성분
 *               drug_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 약학정보 id 리스트
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '409':
 *         $ref: '#/components/responses/409'
 */

// 질병 상세정보 입력 - 질병 테이블 입력
exports.register = async (req, res, next) => {
  const requestBody = req.body;

  if (!(await verifyFormRegisterDisease(req, res))) {
    next();
    return;
  }

  try {
    let exDisease;
    exDisease = await Disease.create({
      ...requestBody["content"],
    });

    for (let content in requestBody) {
      switch (content) {
        case "parts":
          for (let part of requestBody[content]) {
            const newPart = await Part.create({
              ...part,
            });
            await exDisease.addPart(newPart);
          }
          break;
        case "part_ids":
          await exDisease.addParts(requestBody["part_ids"]);
          break;
        case "symptoms":
          for (let symptom of requestBody[content]) {
            const newSymptom = await Symptom.create({
              ...symptom,
            });
            await exDisease.addSymptom(newSymptom);
          }
          break;
        case "symptom_ids":
          await exDisease.addSymptoms(requestBody["symptom_ids"]);
          break;
        case "subjects":
          for (let subject of requestBody[content]) {
            const newSubject = await Subject.create({
              ...subject,
            });
            await exDisease.addSubject(newSubject);
          }
          break;
        case "subect_ids":
          await exDisease.addSubjects(requestBody["subect_ids"]);
          break;
        case "drugs":
          for (let drug of requestBody[content]) {
            const newDrug = await Drug.create({
              ...drug,
            });
            await exDisease.addDrug(newDrug);
          }
          break;
        case "drug_ids":
          await exDisease.addDrugs(requestBody["drug_ids"]);
          break;
      }
    }

    const disease = await Disease.findOne({
      where: {
        id: exDisease.id,
      },
      include: [Part, Symptom, Subject, Drug],
    });
    res.json(disease);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @swagger
 * /disease/{id}:
 *   get:
 *     tags:
 *     - Disease
 *     summary: 질병 상세 내용
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 질병 id
 *       schema:
 *         type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '409':
 *         $ref: '#/components/responses/409'
 */

exports.read = async (req, res, next) => {
  const { id } = req.params;

  try {
    const disease = await Disease.findOne({
      where: { id, deletedAt: null },
      include: [Part, Symptom, Subject, Drug],
    });
    res.json(disease);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @swagger
 * /disease:
 *   get:
 *     tags:
 *     - Disease
 *     summary: 질병 목록
 *     parameters:
 *     - name: keyword
 *       in: query
 *       description: 질병 검색 키워드
 *       schema:
 *         type: integer
 *     - name: page
 *       in: query
 *       description: 질병 검색 결과 페이지 번호
 *       schema:
 *         type: integer
 *     - name: count
 *       in: query
 *       description: 질병 검색 결과 페이지 로우 개수
 *       schema:
 *         type: integer
 *     - name: symptom_ids
 *       in: query
 *       description: 증상 id 리스트
 *       schema:
 *         type: array
 *         items:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '409':
 *         $ref: '#/components/responses/409'
 */

exports.list = async (req, res, next) => {
  const { keyword, symptom_ids } = req.query;
  let { page, count } = req.query;
  const symptom_id_list = [];
  for (let symptom_id of symptom_ids) {
    symptom_id_list.push(parseInt(symptom_id));
  }

  if (!page) {
    page = 1;
  }
  if (!count) {
    count = 5;
  }

  try {
    const diseases = keyword
      ? symptom_ids
        ? await fetchDiseasesOfSymptom(req, symptom_id_list)
        : await Disease.findAll({
            where: {
              deletedAt: null,
              name: {
                [Op.like]: `%${keyword}%`,
              },
            },
            /*
              page 번호가 1이고 count가 5일 때, offset은 0이고
              page 번호가 2이고 count가 5일 때, offset은 5이다.
               */
            offset: count * (page - 1),
            limit: count,
            include: [Part, Symptom, Subject, Drug],
          })
      : symptom_ids
      ? await fetchDiseasesOfSymptom(req, symptom_id_list)
      : await Disease.findAll({
          where: { deletedAt: null },
          offset: count * (page - 1),
          limit: count,
          include: [Part, Symptom, Subject, Drug],
        });

    if (!diseases) {
      res.status(400).send({ message: "해당 질병이 존재하지 않습니다." });
      return;
    }

    res.send(diseases);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @swagger
 * /disease/{id}:
 *   patch:
 *     tags:
 *     - Disease
 *     summary: 질병 수정
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 질병 id
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: 질병 이름
 *                   code:
 *                     type: string
 *                     description: 질병 코드
 *                   description:
 *                     type: string
 *                     description: 질병 내용
 *                   images:
 *                     type: string
 *                     description: 질병 관련 이미지
 *                   cure:
 *                     type: string
 *                     description: 치료법
 *               parts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 관련 부위
 *               part_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 관련 부위 id
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 증상명
 *               symptom_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 증상 id 리스트
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 진료과목 이름
 *               subject_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 증상 id 리스트
 *               drugs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: 약물 이름
 *                     descriptions:
 *                       type: string
 *                       description: 약물 설명
 *                     ingredient:
 *                       type: string
 *                       description: 약물 성분
 *               drug_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: 약학정보 id 리스트
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '409':
 *         $ref: '#/components/responses/409'
 */

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const requestBody = req.body;
  console.log(requestBody);

  try {
    let exDisease;
    exDisease = await Disease.findOne({
      where: { id },
    });

    for (let content in requestBody) {
      switch (content) {
        case "content":
          await Disease.update({
            ...requestBody[content],
          }, {
            where: { id },
          });
          break;
        case "parts":
          for (let part of requestBody[content]) {
            const newPart = await Part.create({
              ...part,
            });
            await exDisease.addPart(newPart);
          }
          break;
        case "part_ids":
          // 기존 id 리스트
          const id_list_part = [];
          const parts = await exDisease.getParts();
          for (let part of parts) {
            id_list.push(part.id);
          }
          // 추가할 id
          for (let id of requestBody[content]) {
            if (!id_list_part.includes(id)) {
              await exDisease.addPart(id);
            }
          }
          // 삭제할 id
          for (let id of id_list_part) {
            if (!requestBody[content].includes(id)) {
              await exDisease.removePart(id);
            }
          }
          break;
        case "symptoms":
          for (let symptom of requestBody[content]) {
            const newSymptom = await Symptom.create({
              ...symptom,
            });
            await exDisease.addSymptom(newSymptom);
          }
          break;
        case "symptom_ids":
          // 기존 id 리스트
          const id_list_symptom = [];
          const symptoms = await exDisease.getSymptoms();
          for (let symptom of symptoms) {
            id_list_symptom.push(symptom.id);
          }
          // 추가할 id
          for (let id of requestBody[content]) {
            if (!id_list_symptom.includes(id)) {
              await exDisease.addSymptom(id);
            }
          }
          // 삭제할 id
          for (let id of id_list_symptom) {
            if (!requestBody[content].includes(id)) {
              await exDisease.removeSymptom(id);
            }
          }
          break;
        case "subjects":
          for (let subject of requestBody[content]) {
            const newSubject = await Subject.create({
              ...subject,
            });
            await exDisease.addSubject(newSubject);
          }
          break;
        case "subect_ids":
          // 기존 id 리스트
          const id_list_subject = [];
          const subjects = await exDisease.getSubjects();
          for (let subject of subjects) {
            id_list_subject.push(subject.id);
          }
          // 추가할 id
          for (let id of requestBody[content]) {
            if (!id_list_subject.includes(id)) {
              await exDisease.addSubject(id);
            }
          }
          // 삭제할 id
          for (let id of id_list_subject) {
            if (!requestBody[content].includes(id)) {
              await exDisease.removeSubject(id);
            }
          }
          break;
        case "drugs":
          for (let drug of requestBody[content]) {
            const newDrug = await Drug.create({
              ...drug,
            });
            await exDisease.addDrug(newDrug);
          }
          break;
        case "drug_ids":
          // 기존 id 리스트
          const id_list_drug = [];
          const drugs = await exDisease.getDrugs();
          for (let drug of drugs) {
            id_list_drug.push(drug.id);
          }
          // 추가할 id
          for (let id of requestBody[content]) {
            if (!id_list_drug.includes(id)) {
              await exDisease.addDrug(id);
            }
          }
          // 삭제할 id
          for (let id of id_list_drug) {
            if (!requestBody[content].includes(id)) {
              await exDisease.removeDrug(id);
            }
          }
          break;
      }
    }

    const disease = await Disease.findOne({
      where: { id },
      include: [Part, Symptom, Subject, Drug],
    });
    res.json(disease);
  } catch(error) {
    res.json(error);
    next(error);
  }
};

/**
 * @swagger
 * /disease/{id}:
 *   delete:
 *     tags:
 *     - Disease
 *     summary: 질병 삭제
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 질병 id
 *       schema:
 *         type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '409':
 *         $ref: '#/components/responses/409'
 */

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const disease = await Disease.findOne({ where: { id } });

    const parts = await disease.getParts();
    await disease.removeParts(parts);

    const symptoms = await disease.getSymptoms();
    await disease.removeSymptoms(symptoms);

    const subjects = await disease.getSubjects();
    await disease.removeSubjects(subjects);

    const drugs = await disease.getDrugs();
    await disease.removeDrugs(drugs);

    await Disease.destroy({
      where: { id }
    });

    res.json({ message: '질병이 삭제되었습니다.' });
  } catch(error) {
    res.json(error);
    next(error);
  }
};
