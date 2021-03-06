'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Partida.belongsTo(models.Juego,{
        foreignKey : 'tipoJuegoId'
      })
    }
  };
  Partida.init({
    tipoJuegoId : DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    inicio: DataTypes.TIME,
    duracion: DataTypes.INTEGER,
    equipoA : DataTypes.STRING,
    factorA : DataTypes.FLOAT,
    equipoB : DataTypes.STRING,
    factorB : DataTypes.FLOAT,
    factorEmpate : DataTypes.FLOAT,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Partida',
    freezeTableName : true
  });
  return Partida;
};