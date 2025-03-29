import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../api/config'

// Create a context for user management
const UserContext = createContext();

// UserProvider component to provide user context to the app
export const UserProvider = ({ children }) => {

  // State variables for users, current page, total pages, loading state, and editing user
  // Initialize users as an empty array, currentPage as 1, totalPages as 1, loading as false, and editingUser as null
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Add this to your existing UserContext
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on the search term
  // This will filter users based on first name, last name, or email
  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  // Wrap fetchUsers in useCallback to prevent unnecessary recreations
  const fetchUsers = useCallback(async (page = 1) => {

    setLoading(true);

    try {
      const response = await api.get(`/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page); // Now we set the page here
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to update user information
  // It takes userId and userData as arguments
  const updateUser = async (userId, userData) => {
    try {
      await api.put(`/users/${userId}`, userData);
      setUsers(users.map(user =>
        user.id === userId ? { ...user, ...userData } : user
      ));
      toast.success('User updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update user');
      return false;
    }
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <UserContext.Provider value={{
      users: filteredUsers,
      currentPage,
      totalPages,
      loading,
      editingUser,
      setEditingUser,
      fetchUsers,
      updateUser,
      deleteUser,
      searchTerm,
      setSearchTerm
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);