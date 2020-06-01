// All Controllers
const auth = require('./AuthController')
const admin = require('./AdminController')
const employee = require('./EmployeeController')

// Export All Controllers
module.exports = {
    auth,
    admin,
    employee,
}