import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://192.168.96.150:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token
      localStorage.setItem('email', email); // Store email

      if (response.data.isAdmin) {
        navigate('/admin'); // Redirect admin to admin page
      } else {
        navigate('/home'); // Redirect regular user to home page
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Login</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Login</button>
          </form>
          <p style={styles.text}>
            Not registered? <Link to="/signup" style={styles.link}>Sign up here</Link>
          </p>
        </div>
      </div>
      <div style={styles.rightSection}>
        <img
          src="src\public\smart-parkx.png" // Place this image in your `public` folder or update the path.
          alt="Smart ParkX"
          style={styles.image}
        />
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh', // Full viewport height
    width: '100vw', // Full viewport width
    margin: 0,
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
  },
  card: {
    backgroundColor: '#1f1f1f',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    width: '350px',
    textAlign: 'center',
  },
  heading: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '24px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #444',
    fontSize: '16px',
    backgroundColor: '#292929',
    color: '#fff',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  text: {
    color: '#aaa',
    marginTop: '15px',
  },
  link: {
    color: '#4caf50',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '8px',
    objectFit: 'contain', // Ensure the image fits well within its container
  },
};

export default Login;
