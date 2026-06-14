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
    avatar: "",
  });

  const handleChange = (e) =>{
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
    };

    const handleFileChange = (e) => {
        setForm({
            ...form,
            avatar: e.target.files[0]
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstname", form.firstName);
        formData.append("lastname", form.lastName);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("phone", form.phone);
        formData.append("username", form.userName);
        formData.append("avatar", form.avatar);

        try{
            const res = await axios.post("http://localhost:3000/users/register", formData);
            console.log("SECCESS: ", res.data);
        } catch (err) {
            console.log("error: ", err.response.data);
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

            <input name="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange} />
            <br />
            <br />

            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default Register;