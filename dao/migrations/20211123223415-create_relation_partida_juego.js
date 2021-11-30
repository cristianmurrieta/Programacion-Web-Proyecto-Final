'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //Agregamos colummna para foreign key

     await queryInterface.addColumn('Partida', 'tipoJuegoId', {
      type : Sequelize.INTEGER,
      allowNull : true
    })

    // Agregamos constraint 

    await queryInterface.addConstraint('Partida', {
      fields : ['tipoJuegoId'],
      type : 'FOREIGN KEY',
      name : 'FK_PARTIDA_TIPOJUEGOID',
      references : {
        table : 'Juego',
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

    await queryInterface.removeConstraint('Partida', 'FK_PARTIDA_JUEGOID')
    await queryInterface.removeColumn('Partida','juegoId')
  }
};
