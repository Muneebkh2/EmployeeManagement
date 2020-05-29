'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            name: 'SuperAdmin',
            email: 'admin@admin.com',
            password: 'admin',
            role_id: 1,
        }], {})
    },

    down: (queryInterface, Sequelize) => { }
};
