'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
    up: (queryInterface, Sequelize) => {
        // Hash password
        const hashPassword = bcrypt.hashSync('admin', 10);
        return queryInterface.bulkInsert('users', [{
            name: 'SuperAdmin',
            email: 'admin@admin.com',
            password: hashPassword,
            role_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {})
    },

    down: (queryInterface, Sequelize) => { }
};
