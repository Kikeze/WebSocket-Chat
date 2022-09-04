const { request, response } = require("express");


const validarArchivoCargado = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: "No se recibio ningun archivo"
        });
    }
  
    if ( !req.files.archivo ) {
        return res.status(400).json({
            msg: "No se recibio ningun archivo"
        });
    }

    next();
};


module.exports = {
    validarArchivoCargado
};

