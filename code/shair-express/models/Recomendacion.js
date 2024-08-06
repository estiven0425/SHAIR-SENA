const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Recomendacion = sequelize.define(
  "Recomendacion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    enunciado: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    archivo_adjunto: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    aprobacion: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
  },
  {
    tableName: "recomendacion",
    timestamps: false,
  }
);

module.exports = Recomendacion;
