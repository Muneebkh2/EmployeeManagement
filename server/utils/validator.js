// Imports Files...
const niv  = require('node-input-validator')
const models = require('../models/index')

module.exports = {
    User: (req) => {
        // Validate request
        niv.extend('unique', async ({ value, args }) => {
            // Check if email exists
            let emailExist = await models[args[0]].findOne({where: {email: value}});
            // email already exists
            if (emailExist) {
                return false;
            }
            return true;
        });

        const validate = new niv.Validator(req.body, {
            name: 'required',
            email: 'required|email|unique:User',
            password: 'required|same:confirm_password'
        });

        return validate;
    }
}