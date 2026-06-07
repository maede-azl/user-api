const {z} = require('zod')

const registerSchema = z.object({
    firstname: z.string().min(2,'نام حداقل باید دو کاراکتر باشد'),
    lastname: z.string().min(2,'نام خانوادگی باید حداقل دو کاراکتر باشد'),
    email: z.string().email('فرمت ایمیل اشتباه است'),
    password: z.string().min(8,'پسورد باید حداقل 8 کاراکتر باشد'),
    phone: z.string().regex(/^09[0-9]{9}$/, 'فرمت شماره تلفن اشتباه است'),
    username: z.string().min(3,'نام کاربری باید حداقل 3 کاراکتر باشد'),
})

module.exports = {registerSchema}