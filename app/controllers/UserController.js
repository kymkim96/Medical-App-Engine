const { Op } = require('sequelize');
const { User } = require("../models");

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *     - User
 *     summary: 프로필 조회
 *     security:
 *       - bearerAuth: []
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

exports.profile = async (req, res) => {
  const { user } = req;
  res.json(user);
};

/**
 * @swagger
 * /profile/{id}:
 *   patch:
 *     tags:
 *     - User
 *     summary: 관리자 수정
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 관리자 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 닉네임(id)
 *               role:
 *                 type: string
 *                 description: 역할
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
    const user = await User.update(
      {
        ...req.body,
      },
      { where: { id } }
    );

    res.json(user);
  } catch (error) {
    console.error(error);
    res.json(error);
    next();
  }
};

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *     - User
 *     summary: 관리자 목록
 *     security:
 *       - bearerAuth: []
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
    const { keyword } = req.query;
    let { pate, count } = req.query;

    try {
        const users = await User.findAll({
            where: keyword
                ? {
                    deletedAt: null,
                    nickname: {
                        [Op.like]: `%${keyword}%`,
                    },
                }
                : {
                    deletedAt: null,
                },
        });

        res.send(users);
    } catch (error) {
        console.error(error);
        res.json(error);
        next();
    }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *     - User
 *     summary: 관리자 상세조회
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 관리자 id
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
    let { pate, count } = req.query;

    try {
        const user = await User.findOne({
            where: {
                deletedAt: null,
                id,
            }
        });

        res.send(user);
    } catch (error) {
        console.error(error);
        res.json(error);
        next();
    }
};

/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     tags:
 *     - User
 *     summary: 관리자 삭제
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 관리자 id
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
    const { id } = req.query;

  try {
    await User.destroy({
      where: { id },
    });

    res.json({ message: "관리자가 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.json(error);
    next();
  }
};
