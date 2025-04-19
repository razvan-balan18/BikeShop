import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteArticle, fetchArticleById } from "../../api/api";
import { useAuth } from "../../AuthContext";

const Article = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();

    const { articleId } = location.state || {};

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!articleId) {
            setError("No article selected");
            setLoading(false);
            return;
        }

        const loadArticle = async () => {
            try {
                const data = await fetchArticleById(articleId);
                setArticle(data);
            } catch (err) {
                setError("Failed to load article details");
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [articleId]);

    const handleDeleteArticle = async () => {
        if (!window.confirm("Are you sure you want to delete this article?")) {
            return;
        }

        try {
            await deleteArticle(articleId);
            alert("Article deleted successfully.");
            navigate("/");
        } catch (err) {
            alert("Failed to delete the article");
        }
    };

    if (loading) {
        return <div className="text-center my-8">Loading article details...</div>;
    }

    if (error) {
        return <div className="text-center my-8 text-red-500">{error}</div>;
    }

    if (!article) {
        return <div className="text-center my-8 text-red-500">Article not found or has been deleted.</div>;
    }

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto bg-base-100 shadow-lg p-8 rounded-lg">
                <img
                    src={article.image}
                    alt={article.model}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h1 className="text-4xl font-bold p-2">{article.model}</h1>
                <p className="text-xl text-gray-500 p-2">Price: ${article.price}</p>
                <p className="text-lg p-2">{article.description || "No additional details available."}</p>

                {isAdmin && (
                    <div className="p-2">
                        <Link
                            to="/admin/manage-articles"
                            state={{ articleId: article.id }}
                            className="btn btn-outline btn-warning mt-4 mr-2"
                        >
                            Edit Article
                        </Link>
                        <button
                            onClick={handleDeleteArticle}
                            className="btn btn-outline btn-secondary mt-4"
                        >
                            Delete Article
                        </button>
                    </div>
                )}

                {user && !isAdmin && (
                    <div className="p-2">
                        <Link to="/cart" className="btn btn-outline btn-success mt-4">
                            Buy Article
                        </Link>
                    </div>
                )}

                {!user && (
                    <div className="text-gray-500 text-sm mt-4">
                        Please <Link to="/login" className="text-primary hover:underline">login</Link> to buy this article.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;
