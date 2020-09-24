require("dotenv").config();
const { Op } = require("sequelize");
const { Symptom, Part, Disease } = require("../models");
const { validateFormRegisterSymptom } = require("../util/validateForm");

/**
 * @swagger
 * /symptoms:
 *   post:
 *     tags:
 *     - Symptom
 *     summary: 증상 등록
 *     security:
 *       - bearerAuth: []
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
 *               partId:
 *                 type: integer
 *                 description: 관련 부위 id
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

    if (requestBody["partId"]) {
      await symptom.setPart(requestBody["partId"]);
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
      include: [Part, Disease],
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
 *     - name: keyword
 *       in: query
 *       description: 검색어
 *       schema:
 *         type: string
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
 *     - name: partId
 *       in: query
 *       description: 관련 부위 id
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

exports.list = async (req, res, next) => {
  const { keyword, partId } = req.query;
  let { page, count } = req.query;

  // page = page ? parseInt(page) : 1;
  // count = count ? parseInt(count) : 5;

  let partIdForKeyword;
  if (keyword) {
    const parts = await Part.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
    const tempArray = [];
    for (let part of parts) {
      tempArray.push(part.id);
    }
    partIdForKeyword = tempArray;
  }

  try {
    const symptoms = await Symptom.findAll({
      where: keyword
        ? partId
          ? {
              deletedAt: null,
              name: {
                [Op.like]: `%${keyword}%`,
              },
              partId: parseInt(partId),
            }
          : {
              deletedAt: null,
              [Op.or]: {
                name: {
                  [Op.like]: `%${keyword}%`,
                },
                partId: partIdForKeyword,
              },
            }
        : partId
        ? {
            deletedAt: null,
            partId: parseInt(partId),
          }
        : {
            deletedAt: null,
          },
      // offset: count * (page - 1),
      // limit: count,
      include: [Part, Disease],
    });

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
 *               partId:
 *                 type: integer
 *                 description: 관련 부위 id
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
        case "partId":
          await Symptom.update(
            {
              partId: requestBody[content],
            },
            {
              where: { id },
            }
          );
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

    await Symptom.destroy({
      where: { id },
    });

    res.json({ message: "증상이 삭제되었습니다." });
  } catch (error) {
    res.json(error);
    next(error);
  }
};
