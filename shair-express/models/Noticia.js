// Importamos DataTypes de Sequelize para definir los tipos de datos de los atributos del modelo.
import { DataTypes } from "sequelize";

// Importamos la instancia de Sequelize que se configura en el archivo de configuración de la base de datos.
import { sequelize } from "../config/database.js";

// Importamos el modelo 'Administrador', que se utilizará para definir la relación entre 'Noticia' y 'Administrador'.
import Administrador from "./Administrador.js";

// Definimos el modelo 'Noticia' utilizando el método define de Sequelize.
const Noticia = sequelize.define(
  "Noticia",
  {
    // Atributo 'id' que es el identificador único de la noticia.
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      autoIncrement: true, // Se incrementa automáticamente para cada nuevo registro.
      primaryKey: true, // Este atributo es la clave primaria de la tabla.
    },

    // Atributo 'nombre' para almacenar el nombre de la noticia.
    nombre: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'enunciado' para almacenar el contenido de la noticia.
    enunciado: {
      type: DataTypes.STRING(1000), // Tipo de dato: cadena de texto con un máximo de 1000 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'archivo_adjunto' para almacenar la ruta del archivo adjunto a la noticia.
    archivo_adjunto: {
      type: DataTypes.STRING(1000), // Tipo de dato: cadena de texto con un máximo de 1000 caracteres.
      allowNull: true, // Este campo es opcional y puede ser nulo.
    },

    // Atributo 'lugar' para almacenar el lugar relacionado con la noticia.
    lugar: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'fecha_inicio' para almacenar la fecha de inicio de la noticia.
    fecha_inicio: {
      type: DataTypes.DATE, // Tipo de dato: fecha.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'fecha_fin' para almacenar la fecha de finalización de la noticia.
    fecha_fin: {
      type: DataTypes.DATE, // Tipo de dato: fecha.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'mas_informacion' para almacenar información adicional sobre la noticia.
    mas_informacion: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto (sin límite de caracteres especificado).
      allowNull: true, // Este campo es opcional y puede ser nulo.
    },

    // Atributo 'id_administrador' que es una clave foránea que hace referencia al administrador que creó la noticia.
    id_administrador: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      allowNull: false, // No se permite que este campo sea nulo.
    },
  },
  {
    // Opciones adicionales para el modelo.
    tableName: "noticia", // Nombre de la tabla en la base de datos.
    timestamps: false, // No se gestionan automáticamente las marcas de tiempo (createdAt, updatedAt).
  }
);

// Definimos la relación entre 'Noticia' y 'Administrador'.
// Una noticia pertenece a un administrador (relación de clave foránea).
Noticia.belongsTo(Administrador, {
  foreignKey: "id_administrador", // Nombre del campo en el modelo 'Noticia' que actúa como clave foránea.
  allowNull: false, // No se permite que este campo sea nulo.
});

// Exportamos el modelo 'Noticia' para que pueda ser utilizado en otras partes de la aplicación.
export default Noticia;
