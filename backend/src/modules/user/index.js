import express from 'express';
import userController from './controller.js';
import verifyToken from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/firebase/:firebaseId', verifyToken, userController.getUserByFirebaseId);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;