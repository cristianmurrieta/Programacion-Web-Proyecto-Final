'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartidaEquipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PartidaEquipo.belongsTo(models.Partida, {
        foreignKey : {
          name : 'partidaId'
        }
      })

      PartidaEquipo.belongsTo(models.Equipo, {
        foreignKey : {
          name : 'equipoId'
        }
      })
    }
  };
  PartidaEquipo.init({
    partidaId: DataTypes.INTEGER,
    equipoId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PartidaEquipo',
    freezeTableName: true
  });
  return PartidaEquipo;
};