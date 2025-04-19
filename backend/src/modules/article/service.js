import { prisma } from "../../db.js"


const getAllArticles = async () => {
    return prisma.article.findMany();
}

const getArticleById = async (id) => {
    return prisma.article.findUnique({ where: { id: Number(id) } });
}

const createArticle = async (data) => {
    return prisma.article.create({ data });
}

const updateArticle = async (id, data) => {
    return prisma.article.update({
        where: { id: Number(id) },
        data,
    });
}

const deleteArticle = async (id) => {
    try {
        await prisma.article.delete({ where: { id: Number(id) } })
        return true;
    } catch {
        return false;
    }
}

export default {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
};