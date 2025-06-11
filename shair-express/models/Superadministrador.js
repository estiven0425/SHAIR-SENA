// Importamos DataTypes de Sequelize para definir los tipos de datos de los atributos del modelo.
import { DataTypes } from "sequelize";

// Importamos la instancia de Sequelize que se configura en el archivo de configuración de la base de datos.
import { sequelize } from "../config/database.js";

// Definimos el modelo 'Superadministrador' utilizando el método define de Sequelize.
const Superadministrador = sequelize.define(
  "Superadministrador",
  {
    // Atributo 'id' que es el identificador único del superadministrador.
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      autoIncrement: true, // Se incrementa automáticamente para cada nuevo registro.
      primaryKey: true, // Este atributo es la clave primaria de la tabla.
    },

    // Atributo 'nombre' para almacenar el nombre del superadministrador.
    nombre: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'email' para almacenar la dirección de correo electrónico del superadministrador.
    email: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'celular' para almacenar el número de celular del superadministrador.
    celular: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'telefono' para almacenar el número de teléfono del superadministrador.
    telefono: {
      type: DataTypes.INTEGER, // Tipo de dato: entero.
      allowNull: true, // Este campo es opcional y puede ser nulo.
    },

    // Atributo 'contraseña' para almacenar la contraseña del superadministrador encriptada.
    contraseña: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'perfil_ocupacional' para almacenar el perfil ocupacional del superadministrador.
    perfil_ocupacional: {
      type: DataTypes.STRING(250), // Tipo de dato: cadena de texto con un máximo de 250 caracteres.
      allowNull: false, // No se permite que este campo sea nulo.
    },

    // Atributo 'fecha_creacion' para almacenar la fecha en que se creó el registro del superadministrador.
    fecha_creacion: {
      type: DataTypes.DATE, // Tipo de dato: fecha.
      allowNull: false, // No se permite que este campo sea nulo.
      defaultValue: DataTypes.NOW, // Valor por defecto: la fecha y hora actuales.
    },
  },
  {
    // Opciones adicionales para el modelo.
    tableName: "superadministrador", // Nombre de la tabla en la base de datos.
    timestamps: false, // No se gestionan automáticamente las marcas de tiempo (createdAt, updatedAt).
  }
);

// Exportamos el modelo 'Superadministrador' para que pueda ser utilizado en otras partes de la aplicación.
export default Superadministrador;
