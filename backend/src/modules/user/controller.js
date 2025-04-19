import userService from './service.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserByFirebaseId = async (req, res) => {
    try {
        const user = await userService.getUserByFirebaseId(req.params.firebaseId);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
      const { email, name, role, firebaseId } = req.body;
      if (!email || !name || !role || !firebaseId) {
        return res.status(400).json({ error: 'Email, name, role, and firebaseId are required' });
      }
  
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const success = await userService.deleteUser(req.params.id);
        if (!success) return res.status(404).send('User not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
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