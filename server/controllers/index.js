// All Controllers
const auth = require('./AuthController')
const admin = require('./AdminController')
const employee = require('./EmployeeController')
const attendance = require('./AttendanceController')

// Export All Controllers
module.exports = {
    auth,
    admin,
    employee,
    attendance,
}