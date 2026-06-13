const {createUser, getAllUsers} = require('../services/user.service')
const {successResponse, errorResponse} = require('../utils/response')
const {registerSchema} = require('../validations/user.validation')

const register = async (req, res) => {
    try{
        const validation = registerSchema.safeParse(req.body)

        if(!validation.success){
            return errorResponse(res, 400, validation.error.issues[0].message)
        }

        const {firstname, lastname, email, password, phone, username} = validation.data
        const avatarPath = req.file ? req.file.path : null
        
        const user = await createUser({firstname, lastname, email, password, phone, username, avatarPath})
        return successResponse(res, 201, user)
    } catch (error) {
        if (error.code === 'P2002'){
            return errorResponse(res, 409, 'این ایمیل، نام کاربری یا شماره تلفن قبلا ثبت شده است')
        }
        console.log(error)
        return errorResponse(res, 500, 'خطای سرور')
    }
}

const getUsers = async(req, res) => {
    try{
        const users = await getAllUsers()
        return successResponse(res, 200, users)
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, 'خطای سرور')
    }
}

module.exports = {register, getUsers}