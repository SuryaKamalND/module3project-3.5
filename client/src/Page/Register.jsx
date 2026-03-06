import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  // Form field states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // UI states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  // Navigation hook
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage('');
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };

      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();

      if (response.ok) {

        setSuccessMessage('Account created successfully! Redirecting to login...');

        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);

      } else {
        setApiError(data.message || 'Registration failed. Please try again.');
      }

    } catch (error) {
      console.error('Registration error:', error);
      setApiError('Unable to connect to server. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Create Your Account</h1>
        <p style={subtitleStyle}>
          Join our platform and start creating today
        </p>

        {successMessage && (
          <div style={successStyle}>
            {successMessage}
          </div>
        )}

        {apiError && (
          <div style={errorMessageStyle}>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>

          <div style={fieldStyle}>
            <label htmlFor="name" style={labelStyle}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={errors.name ? inputErrorStyle : inputStyle}
              disabled={isLoading}
            />
            {errors.name && (
              <span style={errorTextStyle}>{errors.name}</span>
            )}
          </div>

          <div style={fieldStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={errors.email ? inputErrorStyle : inputStyle}
              disabled={isLoading}
            />
            {errors.email && (
              <span style={errorTextStyle}>{errors.email}</span>
            )}
          </div>

          <div style={fieldStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              style={errors.password ? inputErrorStyle : inputStyle}
              disabled={isLoading}
            />
            {errors.password && (
              <span style={errorTextStyle}>{errors.password}</span>
            )}
          </div>

          <div style={fieldStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              style={errors.confirmPassword ? inputErrorStyle : inputStyle}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span style={errorTextStyle}>{errors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            style={isLoading ? buttonDisabledStyle : buttonStyle}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={linkTextStyle}>
          Already have an account?{' '}
          <Link to="/login" style={linkStyle}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;