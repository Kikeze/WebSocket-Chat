const {request, response} = require("express");
const { Categoria } = require("../models");


const categoriaGetAll = async (req = request, res = response) => {
    const page = (req.query.page) ? Number(req.query.page) : 1;
    const limite = (req.query.limit) ? Number(req.query.limit) : 5;

    const filter = { estado: true };
    
    const [count, categorias] = await Promise.all([
        Categoria.countDocuments( filter ),
        Categoria.find( filter )
            .populate("usuario", "nombre")
            .skip( (page -1 ) * limite )
            .limit( limite )
    ]);

    res.json({count, categorias});
};

const categoriaGetOne = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = await Categoria.findById( id ).populate("usuario", "nombre");

    res.json( categoria );
};

const categoriaPost = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoria = await Categoria.findOne({ nombre });

    if( categoria ) {
        return res.status(400).json({
            msg: `La categoria ${ nombre } ya existe`
        });
    }

    const data = {
        nombre,
        estado: true,
        usuario: req.usuario._id
    };

    const newCategoria = new Categoria( data );
    await newCategoria.save();

    res.json( newCategoria );
};

const categoriaPut = async (req = request, res = response) => {
    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuario._id
    };
    const categoria = await Categoria.findByIdAndUpdate(id, data).populate("usuario", "nombre");

    res.json( categoria );
};

const categoriaDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const data = {
        estado: false,
        usuario: req.usuario._id
    };
    const categoria = await Categoria.findByIdAndUpdate(id, data).populate("usuario", "nombre");

    res.json( categoria );
};


module.exports = {
    categoriaGetAll,
    categoriaGetOne,
    categoriaPut,
    categoriaPost,
    categoriaDelete
};
