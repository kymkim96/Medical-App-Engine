const { User } = require('../models');

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

exports.profile = async(req, res) => {
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

exports.update = async(req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.update({
            ...req.body,
        }, { where: { id } });

        res.json(user);
    } catch(error) {
        console.error(error);
        res.json(error);
        next();
    }
};

exports.list = async(req, res, next) => {
    try {

    } catch(error) {
        console.error(error);
        res.json(error);
        next();
    }
};

exports.delete = async(req, res, next) => {
    try {

    } catch(error) {
        console.error(error);
        res.json(error);
        next();
    }
};
