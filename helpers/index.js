

const dbValidaor = require("./db-validators");
const googleVerify = require("./google-verify");
const jwtGenerator = require("./jwt-generator");
const subirArchivo = require("./subir-archivo");


module.exports = {
    ...dbValidaor,
    ...googleVerify,
    ...jwtGenerator,
    ...subirArchivo
};


