import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #667eea, #764ba2)"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({...form, password: e.target.value})}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <button style={{
          width: "100%",
          padding: "10px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;