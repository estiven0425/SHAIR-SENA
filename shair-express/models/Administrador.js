// Importamos DataTypes de Sequelize, que se utilizan para definir los tipos de datos de los atributos del modelo.
import { DataTypes } from "sequelize";

// Importamos la instancia de Sequelize que se configura en el archivo de configuración de la base de datos.
import { sequelize } from "../config/database.js";

// Definimos el modelo 'Administrador' utilizando el método define de Sequelize.
const Administrador = sequelize.define(
  "Administrador",
  {
    // Definimos los atributos del modelo 'Administrador' con sus propiedades correspondientes.

    // Atributo 'id_administrador' que es el identificador único del administrador.
    id_administrador: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      autoIncrement: true, // Se incrementa automáticamente para cada nuevo registro.
      primaryKey: true, // Este atributo es la clave primaria de la tabla.
    },

    // Atributo 'nombre' para almacenar el nombre del administrador.
    nombre: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'email' para almacenar la dirección de correo electrónico del administrador.
    email: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'celular' para almacenar el número de celular del administrador.
    celular: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'telefono' para almacenar el número de teléfono del administrador.
    telefono: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      allowNull: true, // Este campo es opcional y puede ser nulo.
    },

    // Atributo 'contraseña' para almacenar la contraseña del administrador (encriptada).
    contraseña: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'fecha_creacion' para almacenar la fecha y hora de creación del registro.
    fecha_creacion: {
      type: DataTypes.DATE, // Tipo de dato: fecha.
      allowNull: false, // No se permite que este campo sea nulo.
      defaultValue: DataTypes.NOW, // Valor por defecto: fecha y hora actual.
    },
  },
  {
    // Opciones adicionales para el modelo.
    tableName: "administrador", // Nombre de la tabla en la base de datos.
    timestamps: false, // No se gestionan automáticamente las marcas de tiempo (createdAt, updatedAt).
  }
);

// Exportamos el modelo 'Administrador' para que pueda ser utilizado en otras partes de la aplicación.
export default Administrador;
