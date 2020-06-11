require('dotenv');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateForm } = require('../util/validateUser');

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *     - Auth
 *     summary: 관리자 등록
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
 *               password:
 *                 type: password
 *                 description: 비밀번호
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

exports.register = async(req, res, next) => {
    const { nickname, password, role } = req.body;

    if(!validateForm(req, res)) {
        next();
        return;
    }

    try {
        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({
            nickname,
            password: hash,
            role: role ? role : 'admin',
        });

        const payload = { id: user.id };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1y',
        });

        res.json({ user, token });
    } catch(error) {
        console.error(error);
        res.json(error);
        next();
    }
};

/**
 * @swagger
 * /sign-in:
 *   post:
 *     tags:
 *     - Auth
 *     summary: 로그인
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
 *               password:
 *                 type: password
 *                 description: 비밀번호
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

exports.signIn = async(req, res, next) => {
    const { nickname, password } = req.body;

    if(!validateForm(req, res)) {
        next();
        return;
    }

    try {
        const user = await User.findOne({ where: { nickname } });

        if (!user) {
            res.status(401).json({ message: "존재하지 않는 관리자입니다." });
            next();
            return;
        }

        if (!await bcrypt.compare(password, user.password)) {
            res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
            next();
            return;
        }

        const payload = { id: user.id };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            // expiresIn: '1y',
        });

        res.json({
            user,
            token,
        });
    } catch(error) {
        console.error(error);
        res.json(error);
        next();
    }
};