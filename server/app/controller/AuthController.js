import express from 'express'
import jwt from 'jsonwebtoken';
import atob from "atob";
import crypto from 'cryptr';
import DB from '../../config/db' // import db connection
import Auth from '../model/Auth' // import model

const crypt = new crypto('nameSpaceSecurity')
const router = express.Router()
// const atob = atob()
class AuthController {


    constructor(){
        // this.atob = atob()
        this.router = router
        this.crypt = crypt
    }

    Signup(){
        return this.router.post('/', (req, res) => {
            
            let name = req.body.name
            let email = req.body.email
            let pass = req.body.password
            // decrypted password
            let decrypted_pass = atob(pass);
        	let encrypted_pass = crypt.encrypt(decrypted_pass);
            
            // console.log(decrypted_pass);
            // console.log(encrypted_pass);
            

            DB.query(Auth.create(name, email, encrypted_pass), (err, result) => {
                if (err) {
                    throw err
                }else{
                    // console.log("Last Inserted ID: ", result.insertId)
                    DB.query(Auth.SUPER_ADMIN(result.insertId), (err) => { if (err) { throw err} })
                    res.send("User Created Successfully !")
                }
            })
        }) 
    }

    SignIn(){
        // let name = 
        return router.post('/login', (req, res) => {
            let email = req.body.email
            let pass = req.body.password

            // decrypted password
            let decrypted_pass = atob(pass)
            let encrypted_pass = crypt.encrypt(decrypted_pass)

            console.log("pwd: ", encrypted_pass)
            
            
            DB.query(Auth.SIGN_IN(email, encrypted_pass), (err, result) => {
                if (err) {
                    throw err
                }else if (result != "") {
                    console.log(JSON.stringify(result))            
                }
            })
        })
    }
}

export default new AuthController()