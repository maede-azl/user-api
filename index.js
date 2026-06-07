require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const {PrismaPg} = require('@prisma/adapter-pg')

const app = express()
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL})
const prisma = new PrismaClient({adapter})

app.use(express.json())
app.use(cors())

app.post('/users', async(req,res)=>{
    try{const {firstname, lastname, email, password, phone, username} = req.body
    
    if(!firstname || !lastname || !email || !password || !phone || !username){
        return res.status(400).json({error: 'همه فیلدها الزامی هستند'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {firstname, lastname, email, password: hashedPassword, phone, username}
    })
    
    const {password: _, ...userWithoutPassword} = user
    res.status(201).json(userWithoutPassword)
}catch (error) {
    if(error.code === 'P2002'){
        return res.status(409).json({error: 'این ایمیل ، نام کاربری یا شماره تلفن قبلا ثبت شده'})
    }
    res.status(500).json({error: 'خطای سرور'})
}
    
})

app.listen(3000, () =>{
    console.log('Server is runnning on port 3000')
})