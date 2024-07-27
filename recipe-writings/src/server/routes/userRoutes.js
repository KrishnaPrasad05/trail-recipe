const express = require('express')
const { addUser, getUsers, updateUser, deleteUser, protected, login, forgotPassword, profile, getUser } = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/user',addUser)
router.get('/user',getUsers)
router.get('/login', login);
router.get('/protected', authMiddleware, protected);
router.get('/profile', authMiddleware, profile);
router.get('/user/:id',getUser)
router.put('/user/:id',updateUser)
router.delete('/user/:id',deleteUser)
router.post('/forgotpassword',forgotPassword)

module.exports= router;