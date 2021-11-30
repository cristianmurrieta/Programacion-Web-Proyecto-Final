'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Juego', 'categoriajuegoid', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    // Agregar siempre que se hace un FK

    await queryInterface.addConstraint('Juego', {
      fields : ['categoriajuegoid'],
      type : 'FOREIGN KEY',
      name : 'FK_JUEGO_CATEGORIAJUEGO',
      references : {
        table : 'Categoriajuego',
        field : 'id'
      }
    })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    //await queryInterface.removeConstraint('Juego', 'FK_JUEGO_CATEGORIAJUEGO')
    await queryInterface.removeColumn('Juego','categoria')

  }
};
