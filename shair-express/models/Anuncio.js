// Importamos DataTypes de Sequelize para definir los tipos de datos de los atributos del modelo.
import { DataTypes } from "sequelize";

// Importamos la instancia de Sequelize que se configura en el archivo de configuración de la base de datos.
import { sequelize } from "../config/database.js";

// Importamos el modelo 'Administrador', que se utilizará para definir la relación entre 'Anuncio' y 'Administrador'.
import Administrador from "./Administrador.js";

// Definimos el modelo 'Anuncio' utilizando el método define de Sequelize.
const Anuncio = sequelize.define(
  "Anuncio",
  {
    // Atributo 'id' que es el identificador único del anuncio.
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      autoIncrement: true, // Se incrementa automáticamente para cada nuevo registro.
      primaryKey: true, // Este atributo es la clave primaria de la tabla.
    },

    // Atributo 'nombre' para almacenar el nombre del anuncio.
    nombre: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'enunciado' para almacenar el contenido del anuncio.
    enunciado: {
      type: DataTypes.STRING(1000), // Tipo de dato: cadena de texto con un máximo de 1000 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'archivo_adjunto' para almacenar la ruta del archivo adjunto al anuncio.
    archivo_adjunto: {
      type: DataTypes.STRING(1000), // Tipo de dato: cadena de texto con un máximo de 1000 caracteres.
      allowNull: true, // Este campo es opcional y puede ser nulo.
    },

    // Atributo 'fecha_expiracion' para almacenar la fecha en la que el anuncio expira.
    fecha_expiracion: {
      type: DataTypes.DATE, // Tipo de dato: fecha.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'mas_informacion' para almacenar información adicional sobre el anuncio.
    mas_informacion: {
      type: DataTypes.STRING(1000), // Tipo de dato: cadena de texto con un máximo de 1000 caracteres.
      allowNull: true, // Este campo es opcional y puede ser nulo.
    },

    // Atributo 'id_administrador' que es una clave foránea que hace referencia al administrador que creó el anuncio.
    id_administrador: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      allowNull: false, // No se permite que este campo sea nulo.
    },
  },
  {
    // Opciones adicionales para el modelo.
    tableName: "anuncio", // Nombre de la tabla en la base de datos.
    timestamps: false, // No se gestionan automáticamente las marcas de tiempo (createdAt, updatedAt).
  }
);

// Definimos la relación entre 'Anuncio' y 'Administrador'.
// Un anuncio pertenece a un administrador (relación de clave foránea).
Anuncio.belongsTo(Administrador, {
  foreignKey: "id_administrador", // Nombre del campo en el modelo 'Anuncio' que actúa como clave foránea.
  allowNull: false, // No se permite que este campo sea nulo.
});

// Exportamos el modelo 'Anuncio' para que pueda ser utilizado en otras partes de la aplicación.
export default Anuncio;
