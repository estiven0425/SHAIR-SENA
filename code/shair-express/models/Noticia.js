const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const administrador = require('./Administrador');
const Noticia = sequelize.define('Noticia', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    lugar: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mas_informacion: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'noticia',
    timestamps: false
});

Noticia.belongsTo(administrador, {
    foreignKey: 'id_administrador',
    allowNull: false
});

module.exports = Noticia;