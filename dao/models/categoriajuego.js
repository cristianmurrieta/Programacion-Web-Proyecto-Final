'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoriajuego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Categoriajuego.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoriajuego',
    freezeTableName : true
  });
  return Categoriajuego;
};