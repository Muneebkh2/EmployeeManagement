let db = require('../../config/db');

let model = {
    signUp : (input, cb) => {
        let data = {
            username: input.username,
            email: input.email,
            password: input.password
        };
        return db.query("INSERT INTO user SET ? ", [data], cb)
    },
    findOne: (username, cb) => {
        return db.query("SELECT * FROM user WHERE username=? AND password=? ", [username], cb)
    },
    findById: (id, cb) => {
        return db.query("SELECT * FROM user WHERE id=? ", [id], cb)
    }
}

module.exports = model