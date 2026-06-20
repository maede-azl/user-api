import { useState } from "react";
import axios from "axios";
import {loginSchema} from "../validations/auth.validation";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const validation = loginSchema.safeParse(form);
    if (!validation.success) {
      const errors = {};
      validation.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("token", res.data.data.token);
      window.location.href = "/users";
      console.log("SUCCESS: ", res.data);
    } catch (err) {
      setError("Username or password is incorrect.");
      console.log("error: ", err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-10 w-full max-w-sm">

        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h1 className="text-xl font-medium text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-400"
          />
          {fieldErrors.username && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.username}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm text-gray-500 mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-400"
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;