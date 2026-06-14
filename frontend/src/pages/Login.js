import { useState } from "react";
import axios from "axios";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:3000/auth/login", {
                email: form.email,
                password: form.password,
            });
            localStorage.setItem("token", res.data.data.token);
            console.log("SECCESS: ", res.data);
        } catch (err) {
            console.log("error: ", err.response.data);
        }
    };

    return(
        <div>
            <h1>Login Page</h1>

            <input name="email"
            type="email"
            placeholder="Email"
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

            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}

export default Login;