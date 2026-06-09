const express = require('express')
const router = express.Router()
const {register} = require('../controllers/user.controller')
const upload = require('../config/multer')

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: ثبت نام کاربر جدید
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firtname
 *               - lastname
 *               - email
 *               - password
 *               - phone
 *               - username
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: Ali
 *               lastname:
 *                 type: string
 *                 example: Asadi
 *               email:
 *                 type: string
 *                 example: Ali@gamil.com
 *               password:
 *                 type: string
 *                 example: password123
 *               phone:
 *                 type: string
 *                 example: "09313123654"
 *               username:
 *                 type: string
 *                 example: ali_a
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: کاربر با موفقیت ثبت شد
 *       400: 
 *         description: خطای validation
 *       409: 
 *         description: کاربر تکراری
 *       500:
 *         description: خطای سرور
 */

router.post('/register', upload.single('avatar'), register)

module.exports = router