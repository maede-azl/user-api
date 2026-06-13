const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')

const createUser = async({firstname, lastname, email, password, phone, username, avatarPath}) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            firstname,
            lastname,
            email,
            password:hashedPassword,
            phone,
            username,
            avatar: avatarPath
        }
    })

    const {password: _, ...userWithoutPassword} = user
    return userWithoutPassword
}

const getAllUsers = async() => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            username: true,
            avatar: true,
            createdAt: true
        }
    })
    return users
}

module.exports = {createUser, getAllUsers}