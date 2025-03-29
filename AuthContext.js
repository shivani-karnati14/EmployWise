import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/config'

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide auth context to the app
export const AuthProvider = ({ children }) => {

  //  State variables for token, loading state, and navigate function
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to log in the user
  // It takes email and password as arguments
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate('/users');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  //  Function to log out the user
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  // Effect to check if the token is present in local storage
  // If not, navigate to the login page
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Return the AuthContext provider with the token, login, logout, and loading state
  // as its value, and render the children components
  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);