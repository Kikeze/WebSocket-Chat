const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt-generator")
const Usuario = require("../models/usuario");
const { googleVerify } = require("../helpers/google-verify");


const loginUser = async (req = request, res = response) => {
    const correo = req.body.correo;
    const password = req.body.password;

    try {
        const message = "El Usuario / Password no son correctos";
        const usuario = await Usuario.findOne({ correo: correo });

        if( !usuario ) {
            return res.status(400).json({
                msg: message
            });
        }

        if( !usuario.estado ) {
            return res.status(400).json({
                msg: message
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword ) {
            return res.status(400).json({
                msg: message
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            msg: "Login OK",
            usuario,
            token
        });
    
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            msg: "Imposible continuar, no se puede autenticar su usuario"
        })
    }
};

const googleSigIn = async (req = request, res = response) => {
    const googleToken = req.body.Google_Token;

    try {
        const googleUser = await googleVerify( googleToken );
        
        let usuario = await Usuario.findOne({ correo: googleUser.email });

        if ( !usuario ) {
            const data = {
                nombre: googleUser.name,
                correo: googleUser.email,
                password: ":P",
                img: googleUser.picture,
                rol: "USER_ROLE",
                estado: true,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        if( !usuario.estado ) {
            return res.status(401).json({
                msg: "Imposible continuar, la cuenta ha sido deshabilitada"
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            msg: "Imposible continuar, no se puede autenticar su usuario"
        })
    }
}


module.exports = {
    loginUser,
    googleSigIn
}

