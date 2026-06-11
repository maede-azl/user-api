import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    userName: "",
    password: "",
  });

  const handleChange = (e) =>{
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
    };

    /*const handleSubmit = async () => {
        console.log(form);
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const res = await axios.post("http://localhost:3000/users/register", {
                firstname: form.firstName,
                lastname: form.lastName,
                email: form.email,
                password: form.password,
                phone: form.phone,
                username: form.userName,
            });
            console.log("SUCCESS: " , res.data)
        } catch (err){
            console.log("error: ", err);
        }
    };

    return(
        <div>
            <h1>Register Page</h1>

            <input name="firstName" 
            type="text" 
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange} />
            <br />
            <br />

            <input name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange} />
            <br />
            <br />

            <input name="phone" 
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange} />
            <br />
            <br />

            <input name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange} />
            <br />
            <br />

            <input name="userName"
            type="text"
            placeholder="User Name"
            value={form.userName}
            onChange={handleChange} />
            <br />
            <br />

            <input name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange} />
            <br />
            <br />

            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default Register;