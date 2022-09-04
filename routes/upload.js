const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizaImagen, descargaImagen } = require("../controllers/upload");
const { listaCatalogos } = require("../helpers");
const { validarCatalogo, validarJWT, validarArchivoCargado } = require("../middlewares");


const router = Router();

router.post("/", [
    validarJWT,
    validarArchivoCargado,
    validarCatalogo
], cargarArchivo);

router.put("/:coleccion/:id", [
    validarJWT,
    validarArchivoCargado,
    check("coleccion").custom((c) => listaCatalogos(c, ["usuario","producto"])),
    check("id", "El id no es valido").isMongoId(),
    validarCatalogo
], actualizaImagen);

router.get("/:coleccion/:id", [
    validarJWT,
    check("coleccion").custom((c) => listaCatalogos(c, ["usuario","producto"])),
    check("id", "El id no es valido").isMongoId(),
    validarCatalogo
], descargaImagen);


module.exports = router;


