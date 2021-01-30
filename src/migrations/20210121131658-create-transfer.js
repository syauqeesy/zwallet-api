'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transfers', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transfers')
  }
}
