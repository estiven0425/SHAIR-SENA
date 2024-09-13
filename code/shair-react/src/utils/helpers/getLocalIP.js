// Importaciones
const os = require("os");
const fs = require("fs");
const path = require("path");

// Obtención de la IP de la interfaz de red activa
function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  // Retorno por defecto si no encuentra una IP
  return "127.0.0.1";
}

// Guardar IP en el archivo .env
function saveIPToEnv() {
  const localIP = getLocalIP();
  const envPath = path.join(__dirname, "../../../.env");

  // Leer el contenido existente del archivo .env
  let envContent = "";
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf-8");
  }

  // Reemplazar o añadir la variable sin duplicar el prefijo
  const newEnvContent = envContent
    .split("\n")
    .filter((line) => !line.startsWith("REACT_APP_LOCAL_IP=")) // Filtrar las líneas que contienen la variable
    .concat(`REACT_APP_LOCAL_IP=${localIP}`) // Añadir la nueva variable
    .join("\n");

  // Guardar el archivo
  fs.writeFileSync(envPath, newEnvContent, "utf-8");

  console.log(`IP guardada en el archivo .env: ${localIP}`);
}

saveIPToEnv();
