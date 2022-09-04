const { Router, request, response } = require("express");
const { check } = require("express-validator");
const { categoriaGetAll, categoriaGetOne, categoriaPost, categoriaPut, categoriaDelete } = require("../controllers/categoria");
const { existeCategoriaPorID } = require("../helpers/db-validators");
const { validarJWT, validarCatalogo, esAdminRole } = require("../middlewares");

const router = Router();


router.get("/", categoriaGetAll );

router.get("/:id", [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeCategoriaPorID ),
    validarCatalogo
], categoriaGetOne );

router.post("/", [
    validarJWT,
    check("nombre", "El nombre es oblitorio").not().isEmpty(),
    validarCatalogo
], categoriaPost );

router.put("/:id", [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeCategoriaPorID ),
    check("nombre", "El nombre es oblitorio").not().isEmpty(),
    validarCatalogo
], categoriaPut );

router.delete("/:id" , [
    validarJWT,
    esAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeCategoriaPorID ),
    validarCatalogo
], categoriaDelete );


module.exports = router;


