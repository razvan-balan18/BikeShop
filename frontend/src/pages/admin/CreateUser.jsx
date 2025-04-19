import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/api";

const CreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "basic",
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await createUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role === 'admin' ? 'admin' : 'basic'
            });
            alert("User created successfully.");
            navigate("/users/all-users");
        } catch (err) {
            console.error('Error during user creation:', err);
            setError(err.response?.data?.error || "Failed to create user.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Create User</h1>

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
                        required
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
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-lg">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
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
                        <option value="basic">Basic User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
