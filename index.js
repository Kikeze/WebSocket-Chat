// Importaciones de node
require("dotenv").config({ path: "vars.env" });

// Importaciones propias
const Server = require("./models/server");


// Inicio de la aplicacion
const server = new Server();
server.listen();








