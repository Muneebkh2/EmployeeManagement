'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name: 'SuperAdmin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Employee',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {})
    },

    down: (queryInterface, Sequelize) => { }
};
