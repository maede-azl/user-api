const prisma = require('../config/prisma')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async({username, password}) => {
    const user = await prisma.user.findUnique({
        where: {username}
    })

    if (!user) {
        throw new Error('نام کاربری یا رمز عبور اشتباه است')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        throw new Error ('نام کاربری یا رمز عبور اشتباه است')
    }
     
    const token = jwt.sign(
        { userId: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )

    return {token}
}

module.exports = {loginUser}