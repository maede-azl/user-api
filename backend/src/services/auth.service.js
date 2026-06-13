const prisma = require('../config/prisma')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async({email, password}) => {
    const user = await prisma.user.findUnique({
        where: {email}
    })

    if (!user) {
        throw new Error('ایمیل یا رمز عبور اشتباه است')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        throw new Error ('ایمیل یا رمز عبور اشتباه است')
    }
     
    const token = jwt.sign(
        { userId: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )

    return {token}
}

module.exports = {loginUser}