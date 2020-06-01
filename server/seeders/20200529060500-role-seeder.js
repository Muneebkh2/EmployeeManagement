'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            { name: 'SuperAdmin' },
            { name: 'Admin' },
            { name: 'Employee' },
            { createdAt: new Date() },
            { updatedAt: new Date() }
        ], {})
    },

    down: (queryInterface, Sequelize) => { }
};
