const express = require('express')
const router = express.Router()

// ========
// Controllers Imports Here
// ====
const authController = require('../controllers').auth
const adminController = require('../controllers').admin
const employeeController = require('../controllers').employee

// Welcome Check
router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome To Employee Management - Rest Services',
}))

// ========
// App Routes Starts Here
// ====

// Login Route
router.post('/login', authController.login)

// >>> Admins Routes
// Get Admin By ID
router.get('/admin/id/:id', adminController.getAdminById)
// Get All Admins
router.get('/admin/all', adminController.getAllAdmin)
// Create Admin
router.post('/admin/create', adminController.createAdmin)
// Update Admin
router.put('/admin/update/:id', adminController.updateAdmin)
// Delete Admin
router.delete('/admin/delete/:id', adminController.deleteAdmin)

// >>> Employees Routes
// Get Employee By ID
router.get('/employee/id/:id', employeeController.getEmployeeById)
// Get All Employees
router.get('/employee/all', employeeController.getAllEmployees)
// Create Employee
router.post('/employee/create', employeeController.createEmployee)
// Update Employee
router.put('/employee/update/:id', employeeController.updateEmployee)
// Delete Employee
router.delete('/employee/delete/:id', employeeController.deleteEmployee)

module.exports = router;