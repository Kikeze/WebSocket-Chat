const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");


const socketController = async (socket = new Socket()) => {
    const token = socket.handshake.headers["x-wait"];
    const usuario = await comprobarJWT(token);

    if( !usuario ) {
        return socket.disconnect();
    }

    console.log("Se conecto:", usuario.nombre);
};


module.exports = {
    socketController
};

