import axios from 'axios'; // Import axios for API calls
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role as "user"
  const [errorMessages, setErrorMessages] = useState([]); // Store error messages
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // State to control login prompt visibility
  const [showErrors, setShowErrors] = useState(false); // Control visibility of error messages
  const navigate = useNavigate();

// Set the background image on the body element
useEffect(() => {
  // Set background image dynamically
  const bodyElement = document.body;
  bodyElement.style.backgroundImage = "url('assets/img/regist1.png')"; // Path to the background image
  bodyElement.style.backgroundSize = 'cover';
  bodyElement.style.backgroundRepeat = 'no-repeat';
  bodyElement.style.backgroundPosition = 'center';
  bodyElement.style.height = '100vh';
  bodyElement.style.margin = '0';
  bodyElement.style.padding = '0';

  return () => {
    // Cleanup styles on component unmount
    bodyElement.style.backgroundImage = '';
    bodyElement.style.backgroundSize = '';
    bodyElement.style.backgroundRepeat = '';
    bodyElement.style.backgroundPosition = '';
    bodyElement.style.height = '';
    bodyElement.style.margin = '';
    bodyElement.style.padding = '';
  };
}, []);


  // Clear error messages after 3 seconds
  useEffect(() => {
    if (showErrors && errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setErrorMessages([]);
        setShowErrors(false);
      }, 3000); // Error disappears after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showErrors, errorMessages]);

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (password !== confirmPassword) {
      setErrorMessages(["Passwords don't match"]);
      setShowErrors(true);
      return;
    }

    if (password.length < 6) {
      setErrorMessages(["Password must be at least 6 characters long"]);
      setShowErrors(true);
      return;
    }

    // Send registration data to the backend
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        email: email.trim(), // Ensure no leading/trailing spaces
        username: name.trim(), // Ensure no leading/trailing spaces
        password,
        confirmPassword,
        role: role.toUpperCase() // Make sure the role is uppercase
      });

      if (response.data.status === 'OK'){
           alert('Registration successful!');
           if (role === 'user') {
            navigate('/user-login'); // Redirect to doctor login if doctor role is selected
          } else {
            navigate('/doctor-login'); // Redirect to user login if user role is selected
          }
      }
      // Redirect based on the selected role
      

    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Username already exists! Please log in.") {
          setShowLoginPrompt(true); // Show the login prompt if username exists
        } else {
          setErrorMessages([errorMessage]); // Handle other error messages
          setShowErrors(true); // Show the error messages
        }
      } else {
        setErrorMessages(['An unexpected error occurred']);
        setShowErrors(true);
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      {showLoginPrompt && (
        <div className="login-prompt">
          <p>Email already exists! Please <a href="/doctor-login">Login here</a></p>
        </div>
      )}
      
      {/* Display error messages above the Register button */}
      {showErrors && errorMessages.length > 0 && (
        <div className="error-messages">
          <ul>
            {errorMessages.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleRegistration} className="registration-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your username (3-50 characters)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Enter your password (min 6 characters)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Confirm your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="doctor">DOCTOR</option>
            <option value="user">USER</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        <p>
          Already have an account?{' '}
          <a href={role === 'user' ? "/user-login" : "/doctor-login"}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
