const { Router, request, response } = require("express");
const { check } = require("express-validator");
const { productoGetAll, productoGetOne, productoPost, productoPut, productoDelete } = require("../controllers/producto");
const { existeCategoriaPorID, existeProductoPorID } = require("../helpers/db-validators");
const { validarJWT, validarCatalogo, esAdminRole } = require("../middlewares");

const router = Router();


router.get("/", productoGetAll );

router.get("/:id", [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeProductoPorID ),
    validarCatalogo
], productoGetOne );

router.post("/", [
    validarJWT,
    check("nombre", "El nombre es oblitorio").not().isEmpty(),
    check("categoria", "El id de categoria no es valido").isMongoId(),
    check("categoria").custom( existeCategoriaPorID ),
    validarCatalogo
], productoPost );

router.put("/:id", [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeProductoPorID ),
    validarCatalogo
], productoPut );

router.delete("/:id" , [
    validarJWT,
    esAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeProductoPorID ),
    validarCatalogo
], productoDelete );


module.exports = router;


