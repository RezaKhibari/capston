import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost/fin-guard-api/login.php",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status === "success") {
        setSuccess("Login successful! Welcome, " + response.data.user.username);
        console.log("User Data:", response.data.user);
        // Redirect to Dashboard
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px",
            border: "none",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => navigate("/")}
                >
                    Home
                </button>

      </form>
    </div>
  );
};

export default Login;