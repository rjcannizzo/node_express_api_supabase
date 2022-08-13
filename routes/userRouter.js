const express = require('express')

const { createUser, getAllUsers, getUserById, deleteUser, updateUser} = require('../controllers/userController.js')

const router = express.Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router
