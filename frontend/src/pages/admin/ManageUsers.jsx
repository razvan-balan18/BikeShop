import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchUserById, updateUser } from "../../api/api";

const ManageUsers = () => {
  const location = useLocation();
  const { userId } = location.state || {};  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        firebaseId: "",
        role: "user", 
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await fetchUserById(userId); 
                setFormData({
                    name: user.name,
                    email: user.email,
                    firebaseId: user.firebaseId,
                    role: user.role === 'admin' ? 'admin' : 'user', 
                });
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user data.");
            }
        };

        fetchUserData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const roleMap = {
            user: 'basic', 
            admin: 'admin',
        };

        const updatedUser = {
            name: formData.name,
            email: formData.email,
            firebaseId: formData.firebaseId,
            role: roleMap[formData.role],
        };

        try {
            await updateUser(userId, updatedUser); 
            alert("User updated successfully.");
            navigate("/users/all-users");
        } catch (err) {
            console.error("Error during user update:", err);
            setError("Failed to update user.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Edit User</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="firebaseId" className="block text-lg">Firebase ID</label>
                    <input
                        type="text"
                        id="firebaseId"
                        name="firebaseId"
                        value={formData.firebaseId}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-lg">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
        </div>
    );
};

export default ManageUsers;
