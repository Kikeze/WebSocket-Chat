const { Router } = require("express");
const { check } = require("express-validator");
const { esRoleValido, existeCorreo, existeUsuarioPorID } = require("../helpers/db-validators");
const { validarUsuario, validarJWT, esAdminRole, tieneRole } = require("../middlewares");
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controllers/usuario");


const router = Router();

router.get("/", usuarioGet);

router.post("/", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom( existeCorreo ),
    check("password", "La contraseña es obligatoria").isLength({ min: 6}),
    check("rol").custom( esRoleValido ),
    validarUsuario    
], usuarioPost);

router.put("/:id", [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeUsuarioPorID ),
    check("rol").custom( esRoleValido ),
    validarUsuario
], usuarioPut);

router.patch("/", usuarioPatch);

router.delete("/:id", [
    validarJWT,
    tieneRole("ADMIN_ROLE","USER_ROLE"),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom( existeUsuarioPorID ),
    validarUsuario
], usuarioDelete);


module.exports = router;

