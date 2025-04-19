import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// articles
export const fetchArticles = async () => {
    const response = await api.get("/article");
    return response.data;
};

export const fetchArticleById = async (id) => {
    const response = await api.get(`/article/${id}`);
    return response.data;
};

export const createArticle = async (article) => {
    const response = await api.post("/article", article);
    return response.data;
};

export const updateArticle = async (id, updatedArticle) => {
    const response = await api.put(`/article/${id}`, updatedArticle);
    return response.data;
};

export const deleteArticle = async (id) => {
    const response = await api.delete(`/article/${id}`);
    return response.data;
};


// users

export const fetchUsers = async () => {
    const response = await api.get("/user");
    return response.data;
};

export const fetchUserById = async (id) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await api.post("/user", user);
    return response.data;
};

export const updateUser = async (id, updatedUser) => {
    const response = await api.put(`/user/${id}`, updatedUser);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
};