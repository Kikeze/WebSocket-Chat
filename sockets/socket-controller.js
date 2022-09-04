const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");


const chatMensajes = new ChatMensajes();

const socketController = async (socket = new Socket(), io) => {
    const token = socket.handshake.headers["x-wait"];
    const usuario = await comprobarJWT(token);

    if( !usuario ) {
        return socket.disconnect();
    }

    chatMensajes.agregarUsuario( usuario );
    io.emit("usuarios-activos", chatMensajes.arregloUsuarios);
    socket.emit("recibir-mensajes", chatMensajes.ultimosMensajes);

    socket.join( usuario.id );

    socket.on("disconnect", (e) => {
        chatMensajes.quitarUsuario( usuario.id );
        io.emit("usuarios-activos", chatMensajes.arregloUsuarios);
    })

    socket.on("enviar-mensaje", (e) => {
        if( e.uid && e.uid.length >= 1 ) {
            socket.to( e.uid ).emit("mensaje-privado", {nombre: usuario.nombre, mensaje: e.mensaje});
        }
        else {
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, e.mensaje);
            io.emit("recibir-mensajes", chatMensajes.ultimosMensajes);
        }
    });
};


module.exports = {
    socketController
};

