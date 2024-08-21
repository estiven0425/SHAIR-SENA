// Importamos el módulo Sequelize, que es un ORM (Object-Relational Mapping) para manejar bases de datos SQL en Node.js.
const { Sequelize } = require("sequelize");

// Creamos una nueva instancia de Sequelize, especificando los parámetros de conexión:
// - "shair": nombre de la base de datos
// - "root": usuario de la base de datos
// - "": contraseña de la base de datos (vacía en este caso)
// - host: especifica la dirección del servidor donde se encuentra la base de datos (en este caso, "localhost")
// - dialect: especifica el tipo de base de datos que estamos usando, en este caso "mysql".
const sequelize = new Sequelize("shair", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Definimos una función asíncrona para conectar con la base de datos.
const coneccionBD = async () => {
  try {
    // Intentamos autenticar la conexión con la base de datos usando Sequelize.
    await sequelize.authenticate();

    // Si la autenticación es exitosa, imprimimos un mensaje en la consola indicando que la conexión ha sido establecida.
    console.log("MySQL conectado");
  } catch (error) {
    // Si ocurre un error durante la autenticación, capturamos el error y mostramos un mensaje de error en la consola.
    console.error("Imposible conectar a la base de datos. Error: ", error);
  }
};

// Exportamos la instancia de Sequelize y la función de conexión para que puedan ser utilizadas en otros módulos del proyecto.
module.exports = { sequelize, coneccionBD };
