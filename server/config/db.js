const mysql = require('mysql')

export const DBCredentials = {
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'employee_management'
}

const connection = mysql.createConnection(DBCredentials)

export default connection;