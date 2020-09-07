const express = require('express')
const router = express.Router()
// const auth  = require('./auth')
// const middlewareJwt = require('../utils/middleware').validateToken;

// ========
// Controllers Imports Here
// ====
const authController = require('../controllers').auth
const adminController = require('../controllers').admin
const employeeController = require('../controllers').employee
const attendanceController = require('../controllers').attendance

// Welcome Check
router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome To Employee Management - Rest Services',
}))

// ========
// App Routes Starts Here
// ====

// >>> Auth Routes
// Login
router.post('/login', authController.login)
router.post('/forgotPassword/email', authController.forgotPasswordEmail)
router.post('/forgotPassword', authController.forgotPassword)

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
router.get('/employee/all' ,employeeController.getAllEmployees)
// Create Employee
router.post('/employee/create', employeeController.createEmployee)
// Update Employee
router.put('/employee/update/:id', employeeController.updateEmployee)
// Delete Employee
router.delete('/employee/delete/:id', employeeController.deleteEmployee)
// >>> Employees Attendance Routes
// Mark **
router.post('/employee/attendance/mark/', attendanceController.markAttendance)
// Get **
router.get('/employee/attendance/get/:id', attendanceController.getAttendance)

module.exports = router;