class Auth {

    create(name, email, password){
        return "INSERT INTO users (id, name, email, password) VALUES ('','" + name + "', '" + email + "', '" + password + "');"
    }
    SUPER_ADMIN(id){
        return "INSERT INTO users_role(user_id, role_id) VALUES ('" + id + "', 1);"
    }
    ADMIN(id){
        return "INSERT INTO users_role(user_id, role_id) VALUES ('" + id + "', 2);"
    }
    EMPLOYEE(id){
        return "INSERT INTO users_role(user_id, role_id) VALUES ('" + id + "', 3);"
    }

    SIGN_IN(email, pass){
        return "SELECT * FROM users WHERE email = '" + email + "' && password = '" + pass + "';"
    }
}

export default new Auth()