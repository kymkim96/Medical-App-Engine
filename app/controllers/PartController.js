require("dotenv");
const { Part, Disease, Symptom } = require("../models");
const { validateFormRegisterPart } = require("../util/validateForm");

/**
 * @swagger
 * /parts:
 *   post:
 *     tags:
 *     - Part
 *     summary: 관련부위 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 관련부위 이름
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
  const { name } = req.body;

  try {
    if (!(await validateFormRegisterPart(req, res))) {
      next();
      return;
    }

    const part = await Part.create({
      name,
    });

    res.json(part);
  } catch (error) {
    console.error(error);
    res.json(error);
    next();
  }
};

/**
 * @swagger
 * /parts/{id}:
 *   get:
 *     tags:
 *     - Part
 *     summary: 관련부위 상세 내용
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 관련부위 id
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
    const part = await Part.findOne({
      where: { id, deletedAt: null },
      include: [Disease, Symptom],
    });
    res.json(part);
  } catch (error) {
    console.error(error);
    res.json(error);
    next();
  }
};

/**
 * @swagger
 * /parts:
 *   get:
 *     tags:
 *     - Part
 *     summary: 관련 부위 목록
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
  let { page, count } = req.query;

  page = page ? parseInt(page) : 1;
  count = count ? parseInt(count) : 5;

  try {
    const parts = await Part.findAll({
      where: { deletedAt: null },
      offset: count * (page - 1),
      limit: count,
    });

    if (!parts) {
      res.status(400).send({ message: "해당 부위가 존재하지 않습니다." });
      return;
    }

    res.send(parts);
  } catch (error) {
    console.error(error);
    next();
  }
};

/**
 * @swagger
 * /parts/{id}:
 *   patch:
 *     tags:
 *     - Part
 *     summary: 관련부위 수정
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 관련부위 id
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 관련부위 이름
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

  try {
    const existPart = await Part.findOne({
      where: { id },
    });
    
    if (!existPart) {
        res.status('400').json({ message: '관련부위가 존재하지 않습니다.' });
        next();
        return;
    }

    const part = await Part.update(
      {
        ...req.body,
      },
      {
        where: { id },
      }
    );

    res.json(part);
  } catch (error) {
    res.json(error);
    next();
  }
};

/**
 * @swagger
 * /parts/{id}:
 *   delete:
 *     tags:
 *     - Part
 *     summary: 관련부위 삭제
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 관련부위 id
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 관련부위 이름
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
    const part = await Part.findOne({ where: { id } });

    const diseases = await part.getDiseases();
    await part.removeDiseases(diseases);

    const symptoms = await part.getSymptoms();
    await part.removeDiseases(symptoms);

    await Part.destroy({
      where: { id },
    });

    res.json({ message: "관련부위가 삭제되었습니다." });
  } catch (error) {
    res.json(error);
    next();
  }
};
