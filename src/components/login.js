import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginimg from "./images/loginimg.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./style.css";
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (data) => {

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    toast.error("No account found. Please sign up first.");
    return;
  }

  if (
    data.email !== savedUser.email ||
    data.password !== savedUser.password
  ) {
    toast.error("Invalid email or password.");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");

  if (rememberMe) {
    localStorage.setItem("userEmail", data.email);
  }

  toast.success("Login Successfully");

  navigate("/dashboard");
};
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1 id="login-heading">Welcome Back</h1>
          <p id="login-description">
            Sign in to access your tasks, calendar, analytics and boost your
            productivity.
          </p>
          <img src={loginimg} alt="Login Illustration" />
        </div>
        <div className="login-right">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
            <div className="login-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div className="login-input-group">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password")}
              />
              <p className="error">{errors.password?.message}</p>
              <button
                type="button"
                className="show-password-btn"
                onClick={togglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <Link to="/">Forgot Password?</Link>
            </div>
            <button id="login-submit-btn" type="submit">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
