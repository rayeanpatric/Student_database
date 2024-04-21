import React, { useState, useEffect } from 'react';
import { TextField, Button, Link } from '@mui/material';
import './LoginForm.css';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import logo from './logo.png'; 

const LoginForm = ({ history }) => { // Inject history prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const auth = getAuth();
    const handleNavigation = async () => {
      await signOut(auth);
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('beforeunload', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('beforeunload', handleNavigation);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(); // Get the auth object
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate('/profile', { user: auth.currentUser }); // Navigate to evarsity page
      }, 3000);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="glassmorphism-container">
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity="success">
          Logged in successfully
        </Alert>
      </Snackbar>
      <form className="login-form" onSubmit={handleLogin}>
        <img src={logo} alt="Logo" className="logo" />
        <h2 style={{ color: '#e2e2e2', textAlign: 'center' }}>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="input-group">
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button variant="contained" type="submit" style={{ background: 'linear-gradient(135deg, #4564D3, #00B191)', color: '#fff' }}>
          Login
        </Button>
        <div className="forgot-password">
          <Link href="#" style={{ color: '#fff' }}>Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
