const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Superadministrador = sequelize.define(
  "Superadministrador",
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
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    celular: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contraseña: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    perfil_ocupacional: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "superadministrador",
    timestamps: false,
  }
);

module.exports = Superadministrador;
