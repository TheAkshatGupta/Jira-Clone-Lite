import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      alert(res.data.message);

      // redirect to login
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>

    </div>
  );
}

export default Register;