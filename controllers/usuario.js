const {request, response} = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");


const usuarioGet = async (req = request, res = response) => {
    const page = (req.query.page) ? Number(req.query.page) : 1;
    const limite = (req.query.limit) ? Number(req.query.limit) : 5;

    const filter = { estado: true };
    
    const [count, usuarios] = await Promise.all([
        Usuario.countDocuments( filter ),
        Usuario.find( filter )
            .skip( (page -1 ) * limite )
            .limit( limite )
    ]);

    res.json({count, usuarios});
};

const usuarioPost = async (req = request, res = response) => {

    const body = req.body;
    const usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        password: body.password,
        rol: body.rol
    });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt);

    await usuario.save();

    res.json( usuario );
};

const usuarioPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json( usuario );
};

const usuarioPatch = (req = request, res = response) => {
    res.json({
        msg: "patch API - Controlador"
    });
};

const usuarioDelete = async (req = request, res = response) => {
    const id = req.params.id;
    const usuarioAutenticado = req.usuario;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json( usuario );
};


module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch,
};
