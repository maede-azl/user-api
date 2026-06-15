const {loginUser} = require('../services/auth.service')
const {successResponse, errorResponse} = require("../utils/response")

const login = async (req, res) => {
    try{
        const {username, password} = req.body

        const result = await loginUser({username, password})

        successResponse(res, 200, result)

    }catch (error) {
    errorResponse(res, 401, error.message)
 }
}

module.exports = {login}