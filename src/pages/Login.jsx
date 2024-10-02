import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; 
import './Signup.css'; 

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      localStorage.setItem('token', result.token);
      navigate('/home');

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">

        <input 
          type="email" 
          {...register("email", { required: true })} 
          placeholder="Email" 
          className="signup-input"
        />
        {errors.email && <span className="error-message">Email is required</span>}

        <input 
          type="password" 
          {...register("password", { required: true })} 
          placeholder="Password" 
          className="signup-input"
        />
        {errors.password && <span className="error-message">Password is required</span>}

        <button type="submit" className="submit-button">Log In</button>
      </form>

      <p className="signup-prompt">
        New here? <Link to="/signup" className="signup-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
