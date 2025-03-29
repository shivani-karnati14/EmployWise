import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Login from './components/Auth/Login';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={
              <ProtectedRoute>
                <UserList />
                <UserForm />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

// ProtectedRoute component to protect routes
// This component checks if the user is authenticated before rendering the children
// If not authenticated, it redirects to the login page
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;