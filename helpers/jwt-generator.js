const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");


const generarJWT = ( uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "18h"
            },
            (err, token) => {
                if( err ) {
                    console.log(err);
                    reject("Imposible continuar con la operacion solicitada");
                }
                else {
                    resolve( token );
                }
            });
    });
};

const comprobarJWT = async (token = "") => {
    try {
        if( token.length <= 10 ) {
            return null;
        }

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return null;
        }
        if( !usuario.estado ) {
            return null;
        }

        return usuario;
    }
    catch( ex ) {
        return null;
    }
};


module.exports = {
    generarJWT,
    comprobarJWT
}











