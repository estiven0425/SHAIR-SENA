// Importamos DataTypes de Sequelize para definir los tipos de datos de los atributos del modelo.
import { DataTypes } from "sequelize";

// Importamos la instancia de Sequelize que se configura en el archivo de configuración de la base de datos.
import { sequelize } from "../config/database.js";

// Definimos el modelo 'Recomendacion' utilizando el método define de Sequelize.
const Recomendacion = sequelize.define(
  "Recomendacion",
  {
    // Atributo 'id' que es el identificador único de la recomendación.
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      autoIncrement: true, // Se incrementa automáticamente para cada nuevo registro.
      primaryKey: true, // Este atributo es la clave primaria de la tabla.
    },

    // Atributo 'nombre' para almacenar el título de la recomendación.
    nombre: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'enunciado' para almacenar el contenido de la recomendación.
    enunciado: {
      type: DataTypes.STRING(1000), // Tipo de dato: cadena de texto con un máximo de 1000 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'archivo_adjunto' para almacenar la ruta del archivo adjunto a la recomendación.
    archivo_adjunto: {
      type: DataTypes.STRING(1000), // Tipo de dato: cadena de texto con un máximo de 1000 caracteres.
      allowNull: true, // Este campo es opcional y puede ser nulo.
    },

    // Atributo 'aprobacion' para indicar si la recomendación está aprobada o no.
    aprobacion: {
      type: DataTypes.TINYINT(1), // Tipo de dato: entero pequeño (1 byte), usado típicamente para valores booleanos.
      allowNull: false, // No se permite que este campo sea nulo.
    },
  },
  {
    // Opciones adicionales para el modelo.
    tableName: "recomendacion", // Nombre de la tabla en la base de datos.
    timestamps: false, // No se gestionan automáticamente las marcas de tiempo (createdAt, updatedAt).
  }
);

// Exportamos el modelo 'Recomendacion' para que pueda ser utilizado en otras partes de la aplicación.
export default Recomendacion;
