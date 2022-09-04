const { request, response } = require("express");


const esAdminRole = (req = request, res = response, next) => {
    const usuario = req.usuario;

    if( !usuario ) {
        return res.status(500).json({
            msg: "Imposible validar el rol sin verificar la autenticacion de usuario"
        });
    }

    if( usuario.rol !== "ADMIN_ROLE" ) {
        return res.status(401).json({
            msg: "El usuario no tiene permiso para realizar esta accion"
        });
    }

    next();
};

const tieneRole = ( ...roles ) => {
    return (req = request, res = response, next) => {
        const usuario = req.usuario;

        if( !usuario ) {
            return res.status(500).json({
                msg: "Imposible validar el rol sin verificar la autenticacion de usuario"
            });
        }

        if( !roles.includes(usuario.rol) ) {
            return res.status(401).json({
                msg: "El usuario no tiene permiso para realizar esta accion"
            });
        }
        
        next();
    }
};


module.exports = {
    esAdminRole,
    tieneRole
};
