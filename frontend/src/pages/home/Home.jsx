import { useEffect, useState } from "react";
import { fetchArticles } from "../../api/api";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

const Home = ({ isAdmin, isBasic }) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const fetchedArticles = await fetchArticles();
                setArticles(fetchedArticles);
            } catch (err) {
                setError("Failed to load articles");
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    if (loading) {
        return <div className="text-center my-8">Loading articles...</div>;
    }

    if (error) {
        return <div className="text-center my-8 text-red-500">{error}</div>;
    }

    const handleCreateArticle = () => {
        navigate("/admin/create-article");
    };

    return (
        <div className="p-5">
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                    {articles.map((article) => (
                        <Card key={article.id} article={article} isAdmin={isAdmin} isBasic={isBasic}/>
                    ))}
                </div>
            ) : (
                <div className="text-center my-8">No articles available.</div>
            )}
            {
                isAdmin ? (
                    <div  className="fixed bottom-4 left-4">
                        <button
                            onClick={handleCreateArticle}
                            className="btn btn-outline btn-primary"
                        >
                            Create article
                        </button>
                    </div>
                ) : (
                    <div></div>
                )
            }
        </div>
    );
}

export default Home;