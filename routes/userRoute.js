const express = require('express')

const {createUser, updateUser, getAllUsers, getUser, deleteUser} = require("../controller/user")
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');



const router = express.Router()

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router
