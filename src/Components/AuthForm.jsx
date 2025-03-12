import React, { useState } from 'react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = 'Invalid email format';
    }
    if (password.trim() === '') {
      formErrors.password = 'Password cannot be empty';
    }
    if (!isLogin && password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log('Form Submitted:', { email, password });
      setErrors({});
      alert(isLogin ? 'Login Successful' : 'Signup Successful');
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <div className='form-toggle'>
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
            SignUp
          </button>
        </div>

        <form className='form' onSubmit={handleSubmit}>
          <h2>{isLogin ? 'Login Form' : 'SignUp Form'}</h2>

          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <span className='error'>{errors.email}</span>}

          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          {errors.password && <span className='error'>{errors.password}</span>}

          {!isLogin && (
            <>
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
            </>
          )}

          {isLogin && <a href='#'>Forgot password?</a>}
          <button type='submit'>{isLogin ? 'Login' : 'SignUp'}</button>
          {isLogin ? (
            <p>
              Not a member? <a href='#' onClick={() => setIsLogin(false)}>Signup now</a>
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
