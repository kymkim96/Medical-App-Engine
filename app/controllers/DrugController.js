require("dotenv");
const { Drug, Disease } = require("../models");
const { Op } = require("sequelize");
const { validateFormRegisterDrug } = require("../util/validateForm");

/**
 * @swagger
 * /drugs:
 *   post:
 *     tags:
 *     - Drug
 *     summary: 약학정보 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 약학정보 이름
 *               description:
 *                 type: string
 *                 description: 약학정보 설명
 *               ingredients:
 *                 type: string
 *                 description: 약학정보 성분
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
  const { name, description, ingredients } = req.body;

  try {
    if (!(await validateFormRegisterDrug(req, res))) {
      next();
      return;
    }

    const drug = await Drug.create({
      name,
      description,
      ingredients,
    });

    res.json(drug);
  } catch (error) {
    console.error(error);
    res.json(error);
    next();
  }
};

/**
 * @swagger
 * /drugs/{id}:
 *   get:
 *     tags:
 *     - Drug
 *     summary: 약학정보 상세 내용
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 약학정보 id
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
    const drug = await Drug.findOne({
      where: { id, deletedAt: null },
      include: [Disease],
    });
    res.json(drug);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @swagger
 * /drugs:
 *   get:
 *     tags:
 *     - Drug
 *     summary: 약학정보 목록
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
 *     - name: keyword
 *       in: query
 *       description: 검색 키워드
 *       schema:
 *         type: string
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
  let { keyword } = req.query;

  try {
    const drugs = await Drug.findAll({
      where: keyword
        ? {
            name: {
              [Op.like]: `%${keyword}%`,
            },
            deletedAt: null,
          }
        : { deletedAt: null },
    });

    if (!drugs) {
      res.status(400).send({ message: "해당 부위가 존재하지 않습니다." });
      return;
    }

    res.send(drugs);
  } catch (error) {
    console.error(error);
    res.json(error);
    next();
  }
};

/**
 * @swagger
 * /drugs/{id}:
 *   patch:
 *     tags:
 *     - Drug
 *     summary: 약학정보 수정
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 약학정보 id
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
 *                 description: 약학정보 이름
 *               description:
 *                 type: string
 *                 description: 약학정보 설명
 *               ingredients:
 *                 type: string
 *                 description: 약학정보 성분
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
    const existDrug = await Drug.findOne({
      where: { id },
    });

    if (!existDrug) {
      res.status("400").json({ message: "약학정보가 존재하지 않습니다." });
      next();
      return;
    }

    const drug = await Drug.update(
      {
        ...req.body,
      },
      {
        where: { id },
      }
    );

    res.json(drug);
  } catch (error) {
    res.json(error);
    next(error);
  }
};

/**
 * @swagger
 * /drugs/{id}:
 *   delete:
 *     tags:
 *     - Drug
 *     summary: 약학정보 삭제
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 약학정보 id
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
 *                 description: 관련 부위 이름
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
    const drug = await Drug.findOne({ where: { id } });

    const diseases = await drug.getDiseases();
    await drug.removeDiseases(diseases);

    await Drug.destroy({
      where: { id },
    });

    res.json({ message: "약학정보가 삭제되었습니다." });
  } catch (error) {
    res.json(error);
    next(error);
  }
};
