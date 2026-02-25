import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getApiBaseUrl from "../utils/api";

const API_URL = getApiBaseUrl();

function SignupPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    if (payload.password !== payload.confirm) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: payload.fullname,
          email: payload.email,
          password: payload.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ SAVE TOKEN
        localStorage.setItem("token", data.token);

        // Optional: Save user
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Account created successfully!");

        // ✅ Redirect after signup
        navigate("/");
      } else {
        const msg = data.errors ? data.errors[0].msg : data.msg;
        alert(msg || "Signup failed");
      }

    } catch (err) {
      console.error("Connection Error:", err);
      alert("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-signup-container">
      <form className="auth-form-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your Account</h2>
        <div className="auth-subtitle">Begin your journey of self-discovery.</div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            required
            type="text"
            name="fullname"
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            required
            type="email"
            name="email"
            placeholder="Enter your email address"
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
              minLength="6"
              placeholder="Min 6 chars"
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

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div className="input-eye-wrap">
            <input
              className="form-input"
              required
              type={showConfirm ? "text" : "password"}
              name="confirm"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowConfirm(v => !v)}
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button className="cta-btn" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div className="auth-alt-row" style={{ marginTop: 17 }}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
