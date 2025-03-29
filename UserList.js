import { useEffect } from 'react';
import { useUsers } from '../../context/UserContext';
import UserCard from './UserCard';
import Pagination from './Pagination';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../SearchBar'; 

// UserList component to display a list of users with pagination and search functionality
// It uses the UserContext to fetch and manage user data and the AuthContext for logout functionality
const UserList = () => {

  // Fetching users from the UserContext
  // and using the AuthContext for logout functionality
  const {
    users,
    currentPage,
    totalPages,
    loading,
    fetchUsers,
    searchTerm  
  } = useUsers();

  // Fetching the logout function from the AuthContext
  const { logout } = useAuth();

  // useEffect to fetch users when the component mounts or when currentPage changes
  // It also depends on the fetchUsers function to avoid stale closures
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, fetchUsers]);

  // useEffect to fetch users when the searchTerm changes
  if (loading && users.length === 0) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {/* SearchBar component */}
      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Only show pagination when not searching */}
      {!searchTerm && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={fetchUsers}
            />
          )}
    </div>
  );
};

export default UserList;