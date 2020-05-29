const express = require('express')
const router = express.Router()

// ========
// Controllers Imports Here
// ====
const authController = require('../controllers').auth
const adminController = require('../controllers').admin

// Welcome Check
router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome To Employee Management - Rest Services',
}))

// ========
// App Routes Starts Here
// ====

// Login Route
router.post('/login', authController.login)
// >>> Admin Routes
// Get All Admins Route
router.get('/admin/all', adminController.getAllAdmin)
// Create Admin Route
router.post('/admin/create', adminController.createAdmin)
// Update Admin Route
router.put('/admin/update/:id', adminController.updateAdmin)
// Delete Admin Route
router.delete('/admin/delete/:id', adminController.deleteAdmin)

module.exports = router;