import React, { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be empty";
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      setFormData({ email: "", password: "", confirmPassword: "" });
      setErrors({});
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Login Form" : "Sign Up Form"}</h2>

          <input 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input 
            type="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          {!isLogin && (
            <>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={formData.confirmPassword} 
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </>
          )}

          {isLogin && <a href="#">Forgot password?</a>}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

          {isLogin ? (
            <p>Not a member? <a href="#" onClick={() => setIsLogin(false)}>Sign up now</a></p>
          ) : (
            <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a></p>
          )}
        </form>
      </div>
    </div>
  );
}
