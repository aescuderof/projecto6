const express = require('express');
const auth = require('../middleware/authorization');
const {createUser, login, verifyUser, updateUserById} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/register', createUser); // localhost:3000/users/register
userRouter.post('/login', login); // localhost:3000/users/login
userRouter.get('/verify', auth, verifyUser); // localhost:3000/users/verify
userRouter.put('/update', auth, updateUserById); // localhost:3000/users/:id

module.exports = userRouter;