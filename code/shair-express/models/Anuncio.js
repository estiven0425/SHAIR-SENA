const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const administrador = require('./Administrador');
const Anuncio = sequelize.define('Anuncio', {
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
    fecha_expiracion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mas_informacion: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    }
}, {
    tableName: 'anuncio',
    timestamps: false
});

Anuncio.belongsTo(administrador, {
    foreignKey: 'id_administrador',
    allowNull: false
});

module.exports = Anuncio;