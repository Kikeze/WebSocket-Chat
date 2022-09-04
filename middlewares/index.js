

const validarUsuario = require("../middlewares/validar-usuario");
const validarJWT = require("../middlewares/validar-jwt");
const validarRoles = require("../middlewares/validar-roles");
const validarArchivo = require("../middlewares/validar-archivo");


module.exports = {
    ...validarUsuario,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
}


