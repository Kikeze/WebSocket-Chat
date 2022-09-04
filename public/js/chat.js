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
}

const main = async () => {
    await validarJWT();
}

main();


















