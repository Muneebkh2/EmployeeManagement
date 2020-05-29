'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            { name: 'SuperAdmin' },
            { name: 'Admin' },
            { name: 'Employee' }
        ], {})
    },

    down: (queryInterface, Sequelize) => { }
};
