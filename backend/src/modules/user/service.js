import { prisma } from "../../db.js"
import admin from 'firebase-admin';


const getAllUsers = async () => {
    return prisma.user.findMany();
};

const getUserById = async (id) => {
    return prisma.user.findUnique({ where: { id: Number(id) } });
};

const getUserByFirebaseId = async (firebaseId) => {
    return prisma.user.findFirst({ where: { firebaseId } });
};

const createUser = async (data) => {
    const { email, name, role, firebaseId } = data;
    
    if (!name || !email || !firebaseId || !role) {
        throw new Error('Name, email, firebaseId, and role are required');
    }
    
    if (role !== 'basic' && role !== 'admin') {
        throw new Error('Invalid role');
    }

    // Create user in the database
    return prisma.user.create({
        data: {
            firebaseId,
            email,
            name,
            role,
        },
    });
};

const updateUser = async (id, data) => {
    return prisma.user.update({
        where: { id: Number(id) },
        data,
    });
};

const deleteUser = async (id) => {
    try {
        await prisma.user.delete({ where: { id: Number(id) } });
        return true;
    } catch {
        return false;
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByFirebaseId,
    createUser,
    updateUser,
    deleteUser,
};