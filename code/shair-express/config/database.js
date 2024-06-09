const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("shair", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
const coneccionBD = async () => {
  try {
    await sequelize.authenticate();

    console.log("MySQL conectado");
  } catch (error) {
    console.error("Imposible conectar a la base de datos. Error: ", error);
  }
};

module.exports = { sequelize, coneccionBD };
