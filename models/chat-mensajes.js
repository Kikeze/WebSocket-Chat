class Mensaje {
    constructor(uid, nombre, mensaje) {
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
    }
};


class ChatMensajes {
    constructor() {
        this.mensajes = [];
        this.usuarios = {};
    }

    get ultimosMensajes() {
        this.mensajes = this.mensajes.splice(0, 10);
        return this.mensajes;
    }

    get arregloUsuarios() {
        return Object.values( this.usuarios );
    }

    enviarMensaje(uid, nombre, mensaje) {
        this.mensajes.unshift(
            new Mensaje(uid, nombre, mensaje)
        );
    }

    agregarUsuario( usuario ) {
        this.usuarios[usuario.id] = usuario;
    }

    quitarUsuario( id ) {
        delete this.usuarios[id];
    }
};


module.exports = ChatMensajes;
