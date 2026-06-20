import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "نام حداقل باید دو کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل دو کاراکتر باشد"),
  phone: z.string().regex(/^09[0-9]{9}$/, "فرمت شماره تلفن اشتباه است"),
  email: z.string().email("فرمت ایمیل اشتباه است"),
  userName: z.string().min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
  password: z.string().min(8, "پسورد باید حداقل 8 کاراکتر باشد"),
});