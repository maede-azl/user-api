const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')

const createUser = async({firstname, lastname, email, password, phone, username}) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {firstname, lastname, email, password:hashedPassword, phone, username}
    })

    const {password: _, ...userWithoutPassword} = user
    return userWithoutPassword
}

module.exports = {createUser}