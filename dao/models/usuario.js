'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.STRING,
    foto: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    distrito: DataTypes.STRING,
    provincia: DataTypes.STRING,
    departamento: DataTypes.STRING,
    pep: DataTypes.INTEGER,
    estado: DataTypes.INTEGER,
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true
  });
  return Usuario;
};