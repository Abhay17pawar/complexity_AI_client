import React from 'react';
import { useForm } from 'react-hook-form';
import { Link , useNavigate } from 'react-router-dom'; 
import './Signup.css'; 

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
     const token = localStorage.getItem('token'); 

    try {
      const response = await fetch('https://complexity-ai-client-zlvs.vercel.app/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log(result); 
      navigate('/home');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <input 
          type="text" 
          {...register("username", { required: true })} 
          placeholder="Username" 
          className="signup-input"
        />
        {errors.username && <span className="error-message">Username is required</span>}

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

        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <p className="signup-prompt">
        Or <Link to="/login" className="signup-link">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
