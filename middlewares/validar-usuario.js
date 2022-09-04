const {request, response} = require("express");
const { validationResult } = require("express-validator");


const validarUsuario = (req = request, res = response, next) => {
    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    next();
};

const validarAuth = (req = request, res = response, next) => {
    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    next();
};

const validarCatalogo = (req = request, res = response, next) => {
    const errors = validationResult( req );

    if( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    next();
};


module.exports = {
    validarUsuario,
    validarAuth,
    validarCatalogo
};











