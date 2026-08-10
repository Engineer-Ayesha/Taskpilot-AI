import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupimg from "./images/signupimg.png";
import "./style.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.string().min(1, "Email is required").email("Enter a valid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSignup = (data) => {
  if (!agree) {
    toast.error("Please accept Terms & Conditions.");
    return;
  }

  const newUser = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  localStorage.setItem("user", JSON.stringify(newUser));
  toast.success("Account created successfully!");
  navigate("/login");
};
  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Section */}

        <div className="signup-left">
          <h1 id="signup-heading">Create Your Account </h1>

          <p id="signup-description">
            Join TaskPilot AI and organize your tasks, manage deadlines, and
            boost your productivity with one smart workspace.
          </p>

          <img src={signupimg} alt="Signup Illustration" />
        </div>

        {/* Right Section */}

        <div className="signup-right">
          <h2>Create Account</h2>

          <form className="signup-form" onSubmit={handleSubmit(handleSignup)}>
            <div className="signup-input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name")}
              />

              <p className="error">{errors.name?.message}</p>
            </div>

            <div className="signup-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />

              <p className="error">{errors.email?.message}</p>
            </div>

            <div className="signup-input-group">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

            <div className="signup-input-group">
              <label>Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />

              <p className="error">{errors.confirmPassword?.message}</p>

              <button
                type="button"
                className="show-password-btn"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="signup-options">
              <label>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                I agree to the Terms & Conditions
              </label>
            </div>

            <button id="signup-submit-btn">Create Account</button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
