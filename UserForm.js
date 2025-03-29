import { useState, useEffect } from 'react';
import { useUsers } from '../../context/UserContext';

// This component is used to edit user details in a modal form.
// It uses the `useUsers` context to get the current editing user and the function to update the user.
const UserForm = () => {

    // Get the editing user and the function to update the user from the context.
    const { editingUser, updateUser, setEditingUser } = useUsers();

    // State to manage the form data.
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    // Effect to set the form data when the editing user changes.
    // This effect runs when the component mounts and when the `editingUser` changes.
    useEffect(() => {
        if (editingUser) {
            setFormData({
                first_name: editingUser.first_name,
                last_name: editingUser.last_name,
                email: editingUser.email
            });
        }
    }, [editingUser]);

    // Handler for form input changes.
    // This function updates the corresponding field in the form data state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler for form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateUser(editingUser.id, formData);
        if (success) {
            setEditingUser(null);
        }
    };

    // Render the form only if there is an editing user.
    // If there is no editing user, return null to not render anything.
    if (!editingUser) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                                First Name
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="last_name"
                                name="last_name"
                                type="text"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setEditingUser(null)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;