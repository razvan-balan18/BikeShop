import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../api/api";

const CreateArticle = () => {
    const [formData, setFormData] = useState({
        model: "",
        image: "",
        price: "",
        description: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const article = {
            model: formData.model,
            image: formData.image,
            price: parseInt(formData.price),
            description: formData.description,
        };

        try {
            await createArticle(article);
            alert("Article created successfully!");
            navigate("/");
        } catch (err) {
            setError("Failed to create the article.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="model" className="block text-lg">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-lg">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-lg">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full"
                        required
                    />
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">Create Article</button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;
