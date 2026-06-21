const express = require('express')
const router = express.Router()
const {login} = require('../controllers/auth.controller')
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: ورود کاربر
 *     tag: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -username
 *               -password
 *             properties:
 *               username:
 *                 type: string
 *                 example: ali_a
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: ورود موفق، توکن برگردانده میشود
 *       400:
 *         description: خطای validation
 *       401:
 *         description: نام کاربری یا رمز عبور اشتباه است
 */

router.post('/login', login)

module.exports = router