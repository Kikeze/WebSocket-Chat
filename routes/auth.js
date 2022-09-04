const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, googleSigIn } = require("../controllers/auth");
const { validarAuth } = require("../middlewares/validar-usuario");

const router = Router();

router.post("/login", [
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarAuth
], loginUser);

router.post("/google", [
    check("Google_Token", "No se encontro autenticacion de google").not().isEmpty(),
    validarAuth
], googleSigIn);


module.exports = router;


