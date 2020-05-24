require("dotenv");
const { Disease, Subject } = require("../models");
const { validateFormRegisterSubject } = require("../util/validateForm");

/**
 * @swagger
 * /subjects:
 *   post:
 *     tags:
 *     - Subject
 *     summary: 진료과목 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 진료과목 이름
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
        if (!(await validateFormRegisterSubject(req, res))) {
            next();
            return;
        }

        const subject = await Subject.create({
            name,
        });

        res.json(subject);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     tags:
 *     - Subject
 *     summary: 진료과목 상세 내용
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 진료과목 id
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
        const subject = await Subject.findOne({
            where: { id, deletedAt: null },
            include: [Disease],
        });
        res.json(subject);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * @swagger
 * /subjects:
 *   get:
 *     tags:
 *     - Subject
 *     summary: 진료과목 목록
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
        const subjects = await Subject.findAll({
            where: { deletedAt: null },
            offset: count * (page - 1),
            limit: count,
        });

        if (!subjects) {
            res.status(400).send({ message: "해당 부위가 존재하지 않습니다." });
            return;
        }

        res.send(subjects);
    } catch (error) {
        console.error(error);
        res.json(error);
        next();
    }
};

/**
 * @swagger
 * /subjects/{id}:
 *   patch:
 *     tags:
 *     - Subject
 *     summary: 진료과목 수정
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 진료과목 id
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
 *                 description: 진료과목 이름
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
        let existSubject;
        existSubject = await Subject.findOne({
            where: { id },
        });

        if (!existSubject) {
            res.status('400').json({ message: '진료과목이 존재하지 않습니다.' });
            next();
            return;
        }

        const subject = await Subject.update(
            {
                ...req.body,
            },
            {
                where: { id },
            }
        );

        res.json(subject);
    } catch (error) {
        res.json(error);
        next(error);
    }
};

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     tags:
 *     - Subject
 *     summary: 진료과목 삭제
 *     parameters:
 *     - name: id
 *       in: path
 *       description: 진료과목 id
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
 *                 description: 진료과목 이름
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
        const subject = await Subject.findOne({ where: { id } });

        const diseases = await subject.getDiseases();
        await subject.removeDiseases(diseases);

        await Subject.destroy({
            where: { id },
        });

        res.json({ message: "진료과목이 삭제되었습니다." });
    } catch (error) {
        res.json(error);
        next(error);
    }
};