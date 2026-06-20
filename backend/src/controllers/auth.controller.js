const {loginUser} = require('../services/auth.service')
const {successResponse, errorResponse} = require("../utils/response")
const {loginSchema} = require('../validations/auth.validation')

const login = async (req, res) => {
    try{
        const validation = loginSchema.safeParse(req.body)

        if (!validation.success) {
            return errorResponse(res, 400, validation.error.issues[0].message)

        }
        
        const {username, password} = req.body

        const result = await loginUser({username, password})

        successResponse(res, 200, result)

    }catch (error) {
    errorResponse(res, 401, error.message)
 }
}

module.exports = {login}