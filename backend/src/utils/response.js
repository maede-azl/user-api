const successResponse = (res, statusCode = 200, data) =>{
    return res.status(statusCode).json({
        success: true,
        data
    })
}

const errorResponse = (res, statusCode = 500, message)  => {
    return res.status(statusCode).json({
        success: false,
        error: message
    })
}

module.exports = {successResponse, errorResponse}