const express = require('express')
const router = express.Router()
const {register, getUsers} = require('../controllers/user.controller')
const upload = require('../config/multer')
const {authMiddleware} = require('../middlewares/auth.middleware')

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

/**
 * @swagger
 * /users:
 *    get:
 *      summery: لیست تمام کاربران
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: لیست کابران با موفقیت دریافت شد
 *        401:
 *          description: توکن نامعتبر یا ارسال نشده
 *        500:
 *          description: خطای سرور
 */
router.get('/', authMiddleware, getUsers)

module.exports = router