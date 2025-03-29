import { useUsers } from '../../context/UserContext';

// This component represents a single user card in the user management application.
// It displays the user's avatar, name, email, and provides buttons to edit or delete the user.
const UserCard = ({ user }) => {

  // Importing context to manage user state
  const { setEditingUser, deleteUser } = useUsers(); 

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="font-bold text-lg">{user.first_name} {user.last_name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setEditingUser(user)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => deleteUser(user.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;