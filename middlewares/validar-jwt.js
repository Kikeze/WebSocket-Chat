const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


const validarJWT = async (req = request, res = response, next) => {
    const token = req.headers["x-wait"];

    if( !token ) {
        return res.status(401).json({
            msg: "No se especifico el token"
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const uid = payload.uid;
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: "El token no corresponde a un usuario valido"
            });
        }

        if( !usuario.estado ) {
            return res.status(401).json({
                msg: "El usuario autenticado ha sido deshabilitado"
            });
        }

        req.usuario = usuario;

        next();
    }
    catch(err) {
        console.log( err );
        return res.status(401).json({
            msg: "El token no es valido"
        });
    }
}


module.exports = {
    validarJWT
}











