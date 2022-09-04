const express = require("express");
const cors = require("cors");
const path = require("path");
const fileUpload = require('express-fileupload');
const { dbConnection } = require("../database/config");


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: "/api/auth",
            usuario: "/api/usuario",
            categoria: "/api/categoria",
            producto: "/api/producto",
            buscar: "/api/buscar",
            upload: "/api/upload"
        };

        this.conectarDB();

        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));

        this.app.use(fileUpload({
            createParentPath: true,
            limits: { fileSize: 50 * 1024 * 1024 },
            useTempFiles : true,
            tempFileDir : path.join(__dirname, "../tmp/")
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.usuario, require("../routes/usuario"));
        this.app.use(this.paths.categoria, require("../routes/categoria"));
        this.app.use(this.paths.producto, require("../routes/producto"));
        this.app.use(this.paths.buscar, require("../routes/buscar"));
        this.app.use(this.paths.upload, require("../routes/upload"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }

}


module.exports = Server;
