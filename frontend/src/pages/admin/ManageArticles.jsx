import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchArticleById, updateArticle } from "../../api/api.js";

const ManageArticle = () => {
  const location = useLocation();
  const { articleId } = location.state || {};
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    model: "",
    image: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const fetchedArticle = await fetchArticleById(articleId);
        setArticle(fetchedArticle);
        setFormData({
          model: fetchedArticle.model,
          image: fetchedArticle.image,
          price: fetchedArticle.price,
          description: fetchedArticle.description || "",
        });
      } catch (err) {
        setError("Failed to load article details");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? parseInt(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedArticle = {
      model: formData.model,
      image: formData.image,
      price: formData.price,
      description: formData.description,
    };

    try {
      await updateArticle(articleId, updatedArticle);
      navigate('/'); 
    } catch (err) {
      setError("Failed to update the article");
    }
  };

  if (loading) {
    return <div className="text-center my-8">Loading article...</div>;
  }

  if (error) {
    return <div className="text-center my-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>
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
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-lg">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || ""}
            onChange={handleInputChange}
            className="input input-bordered w-full"
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
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Update Article</button>
        </div>
      </form>
    </div>
  );
};

export default ManageArticle;
