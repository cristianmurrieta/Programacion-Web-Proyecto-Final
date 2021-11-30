'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PartidaEquipo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partidaId: {
        type: Sequelize.INTEGER
      },
      equipoId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('PartidaEquipo', {
      fields : ['partidaId'],
      type : 'FOREIGN KEY',
      name : 'FK_PARTIDAEQUIPO_PARTIDA',
      references : {
        table : 'Partida',
        field : 'id'
      }
    })

    await queryInterface.addConstraint('PartidaEquipo', {
      fields : ['equipoId'],
      type : 'FOREIGN KEY',
      name : 'FK_PARTIDAEQUIPO_EQUIPO',
      references : {
        table : 'Equipo',
        field : 'id'
      }
    })

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('PartidaEquipo', 'FK_PARTIDAEQUIPO_PARTIDA' )
    await queryInterface.removeConstraint('PartidaEquipo', 'FK_PARTIDAEQUIPO_EQUIPO' )
    await queryInterface.dropTable('PartidaEquipo ');
  }
};