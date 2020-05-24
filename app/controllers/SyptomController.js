require("dotenv").config();
const { Op } = require("sequelize");
const { Symptom, Part } = require("../models");
const { fetchSymptomsOfPart } = require("../util/functionSymptom");
const { validateFormRegisterSymptom } = require("../util/validateForm");

/**
 * @swagger
 * /symptoms:
 *   post:
 *     tags:
 *     - Symptom
 *     summary: 증상 등록
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
 *                     description: 증상 이름
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

exports.register = async (req, res, next) => {
  const requestBody = req.body;

  try {
    if (!(await validateFormRegisterSymptom(req, res))) {
      next();
      return;
    }

    const symptom = await Symptom.create({
      ...requestBody["content"],
    });

    for (let content in requestBody) {
      switch (content) {
        case "parts":
          for (let part of requestBody[content]) {
            const newPart = await Part.create({
              ...part,
            });
            await Symptom.addPart(newPart);
          }
          break;
        case "part_ids":
          await Symptom.addPart(requestBody[content]);
          break;
      }
    }

    const resultSymptom = await Symptom.findOne({
      where: {
        id: symptom.id,
      },
      include: [Part],
    });
    res.json(resultSymptom);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @swagger
 * /symptoms/{id}:
 *   get:
 *     tags:
 *     - Symptom
 *     summary: 증상 상세 내용
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 증상 id
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
    const symptom = await Symptom.findOne({
      where: { id, deletedAt: null },
      include: [Part],
    });
    res.json(symptom);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @swagger
 * /symptoms:
 *   get:
 *     tags:
 *     - Symptom
 *     summary: 증상 목록
 *     parameters:
 *     - name: page
 *       in: query
 *       description: 페이지 번호
 *       schema:
 *         type: integer
 *     - name: count
 *       in: query
 *       description: 페이지 로우 개수
 *       schema:
 *         type: integer
 *     - name: part_ids
 *       in: query
 *       description: 관련 부위 id 리스트
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
  const { keyword, part_ids } = req.query;
  let { page, count } = req.query;
  const part_id_list = [];
  if (part_ids) {
    for (let part_id of part_ids) {
      part_id_list.push(parseInt(part_id));
    }
  }

  page = page ? parseInt(page) : 1;
  count = count ? parseInt(count) : 5;

  try {
    const symptoms = keyword
      ? part_ids
        ? await fetchSymptomsOfPart(req, part_id_list)
        : await Symptom.findAll({
            where: {
              deletedAt: null,
              name: {
                [Op.like]: `%${keyword}%`,
              },
            },
            offset: count * (page - 1),
            limit: count,
            include: [Part],
          })
      : part_ids
      ? await fetchSymptomsOfPart(req, part_id_list)
      : await Symptom.findAll({
          where: { deletedAt: null },
          offset: count * (page - 1),
          limit: count,
          include: [Part],
        });

    if (!symptoms) {
      res.status(400).send({ message: "증상이 존재하지 않습니다." });
      next();
      return;
    }

    res.send(symptoms);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @swagger
 * /symptoms/{id}:
 *   patch:
 *     tags:
 *     - Symptom
 *     summary: 증상 수정
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 증상 id
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
 *                     description: 증상 이름
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

  try {
    let symptom;
    symptom = await Symptom.findOne({
      where: { id },
    });

    if (!symptom) {
      res.status(400).send({ message: "해당 증상이 존재하지 않습니다." });
      next();
      return;
    }

    for (let content in requestBody) {
      switch (content) {
        case "content":
          await Symptom.update(
            {
              ...requestBody[content],
            },
            {
              where: { id },
            }
          );
          break;
        case "parts":
          for (let part of requestBody[content]) {
            const newPart = await Part.create({
              ...part,
            });
            await Symptom.addPart(newPart);
          }
          break;
        case "part_ids":
          const id_list_part = [];
          const parts = await Symptom.getParts();
          for (let part of parts) {
            id_list_part.push(part.id);
          }
          for (let id of requestBody[content]) {
            if (!id_list_part.includes(id)) {
              await Symptom.addPart(id);
            }
          }

          for (let id of id_list_part) {
            if (!requestBody[content].includes(id)) {
              await Symptom.removePart(id);
            }
          }
          break;
      }
    }

    const resultSymptom = await Symptom.findOne({
      where: { id },
      include: [Part],
    });
    res.json(resultSymptom);
  } catch (error) {
    res.json(error);
    next(error);
  }
};

/**
 * @swagger
 * /symptoms/{id}:
 *   delete:
 *     tags:
 *     - Symptom
 *     summary: 증상 삭제
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 증상 id
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
    const symptom = await Symptom.findOne({ where: { id } });

    const diseases = await symptom.getDiseases();
    await symptom.removeDisease(diseases);

    const parts = await symptom.getParts();
    await symptom.removePart(parts);

    await Symptom.destroy({
      where: { id },
    });

    res.json({ message: "증상이 삭제되었습니다." });
  } catch (error) {
    res.json(error);
    next(error);
  }
};