'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Juego.belongsTo(models.Categoriajuego, {
        foreignKey : 'categoriajuegoid'
      })
    }
  };
  Juego.init({
    nombre: DataTypes.STRING,
    categoriajuegoid : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Juego',
    freezeTableName : true
  });
  return Juego;
};