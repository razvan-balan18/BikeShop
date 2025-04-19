import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../api/api";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            alert("User deleted successfully.");
        } catch (err) {
            alert("Failed to delete the user");
        }
    };

    if (loading) {
        return <div className="text-center my-8">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center my-8 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border ">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border">{user.name}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.role}</td>
                            <td className="px-4 py-2 border">
                                <Link
                                    to={"/admin/edit-user"}
                                    state={{ userId: user.id }}
                                    className="btn btn-outline btn-warning mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="btn btn-outline btn-secondary"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <Link to="/admin/create-user" className="btn btn-outline btn-primary">
                    Create User
                </Link>
            </div>
        </div>
    );
};

export default AllUsers;
