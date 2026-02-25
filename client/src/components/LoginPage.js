import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import getApiBaseUrl from "../utils/api";

function LoginPage({ onSuccess }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = getApiBaseUrl();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (onSuccess && typeof onSuccess === "function") {
          onSuccess();
        }

        navigate("/");
      } else {
        const msg = data.errors ? data.errors[0].msg : data.msg;
        setError(msg || "Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      setError("Server connection error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-signup-container">
      <form className="auth-form-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Welcome Back</h2>
        <div className="auth-subtitle">Sign in to continue your journey.</div>

        {error && (
          <div style={{
            background: "#ff525220",
            border: "1px solid #ff5252",
            color: "#ff5252",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            fontSize: "0.9rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            required
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-eye-wrap">
            <input
              className="form-input"
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button className="cta-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <div className="auth-alt-row">
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
