const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const ulUsuarios = document.querySelector("#ulUsuarios");
const ulMensajes = document.querySelector("#ulMensajes");
const btnSalir = document.querySelector("#btnSalir");

let usuario = null;
let socket = null;


const validarJWT = async () => {
    const token = localStorage.getItem("token") || "";

    if( token.length <= 10) {
        window.location = "index.html";
        throw new Error("No existe el token de autenticacion");
    }

    const resp = await fetch("/api/auth", {
        headers: {"X-Wait": token}
    });

    const {usuario:userDB, token:tokenDB} = await resp.json();
    localStorage.setItem("token", tokenDB);

    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async () => {
    socket = io({
        "extraHeaders": {
            "X-Wait": localStorage.getItem("token")
        }
    });

    socket.on("connect", (e) => {
        console.log("Socket conectado!");
    });

    socket.on("disconnect", (e) => {
        console.log("Socket desconectado!");
    });

    socket.on("recibir-mensajes", (e) => {
        dibujarMensajes(e);
    });

    socket.on("usuarios-activos", (e) => {
        dibujarUsuarios(e);
    });

    socket.on("mensaje-privado", (e) => {
        dibujarMensajePrivado(e);
    });
}

const dibujarUsuarios = (usuarios = []) => {
    let usersHTML = "";
    usuarios.forEach((usuario,index) => {
        usersHTML += `
            <li>
                <p>
                    <h5 class="text-success">${usuario.nombre}</h5>
                    <span class="fs-6 text-muted">${usuario.uid}</span>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = usersHTML;
}

const dibujarMensajes = (mensajes = []) => {
    let mensajesHTML = "";
    mensajes.forEach((mensaje,index) => {
        mensajesHTML += `
            <li>
                <p>
                    <h5 class="text-primary">${mensaje.nombre}:</h5>
                    <span>${mensaje.mensaje}</span>
                </p>
            </li>
        `;
    });

    ulMensajes.innerHTML = mensajesHTML;
}

const dibujarMensajePrivado = (mensajePrivado) => {
    let mensajeHTML = `
        <li>
            <p>
                <h5 class="text-danger">${mensajePrivado.nombre}:</h5>
                <span>${mensajePrivado.mensaje}</span>
            </p>
        </li>
    `;

    ulMensajes.innerHTML = mensajeHTML + ulMensajes.innerHTML;
}

txtMensaje.addEventListener("keyup", (e) => {
    if( e.keyCode === 13) {
        const uid = txtUid.value;
        const mensaje = txtMensaje.value;
        if( mensaje.length >= 1) {
            txtMensaje.value = "";
            socket.emit("enviar-mensaje", {uid, mensaje});
        }
    }
});

const main = async () => {
    await validarJWT();
}

main();


















