import articleService from './service.js'

const getAllArticles = async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getArticleById = async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        if (!article) return res.status(404).send('Article not found');
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createArticle = async (req, res) => {
    try {
        const article = await articleService.createArticle(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateArticle = async (req, res) => {
    try {
        const article = await articleService.updateArticle(req.params.id, req.body);
        if (!article) return res.status(404).send('Article not found');
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const success = await articleService.deleteArticle(req.params.id);
        if (!success) return res.status(404).send('Article not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
};