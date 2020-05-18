const mysql = require('mysql')

export const DBCredentials = {
    host: 'localhost',
    user: 'root',
    pass: '',
    database: 'document_verification'
}

const connection = mysql.createConnection(DBCredentials)

export default connection;