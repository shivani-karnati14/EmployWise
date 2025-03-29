import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// This component handles the login functionality for the user manager application. It uses the AuthContext to manage authentication state and provides a simple form for users to enter their email and password.
// The form includes validation and displays a loading state while the login request is being processed. The component is styled using Tailwind CSS for a clean and modern look.
const Login = () => {

  // State variables to manage email and password inputs
  // The useAuth hook provides access to the authentication context, including the login function and loading state.
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const { login, loading } = useAuth();

  // Function to handle form submission
  // It prevents the default form submission behavior and calls the login function from the AuthContext with the email and password values.
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Render the login form
  // The form includes input fields for email and password, and a submit button that is disabled while loading.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;