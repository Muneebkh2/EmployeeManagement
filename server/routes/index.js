const express = require('express')
const router = express.Router()

// ========
// Controllers Imports Here
// ====
const authController = require('../controllers').auth

// Welcome Check
router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome To Employee Management - Rest Services',
}))

// ========
// App Routes Starts Here
// ====

// Login Route
router.post('login', authController.login)

module.exports = router;