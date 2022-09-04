const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");


const coleciones = [
    "role",
    "usuario",
    "categoria",
    "producto"
];

const buscar = (req = request, res = response) => {
    const coleccion = req.params.coleccion;
    const termino = req.params.termino;

    if( !coleciones.includes(coleccion) ) {
        return res.status(400).json({
            msg: "La coleccion de busqueda no existe"
        });
    }

    switch( coleccion ) {
        case "usuario":
            buscarUsuario( termino, req, res );
            break;
        case "categoria":
            buscarCategoria( termino, req, res );
            break;
        case "producto":
            buscarProducto( termino, req, res );
            break;
        default:
            return res.status(500).json({
                msg: "La busqueda solicitada no ha sido implementada"
            });
    }
};

const buscarUsuario = async (termino = "", req = request, res = response) => {
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        return res.json({
            count: 1,
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp(termino, "i");
    const usuarios = await Usuario.find({
        $or: [
            {nombre: regex},
            {correo: regex}
        ],
        $and: [
            {estado: true}
        ]
    });

    res.json({
        count: usuarios.length,
        results: usuarios
    });
}

const buscarCategoria = async (termino = "", req = request, res = response) => {
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ) {
        const categoria = await Categoria.findById( termino ).populate("usuario", "nombre");
        return res.json({
            count: 1,
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp(termino, "i");
    const categorias = await Categoria.find({
        $or: [
            {nombre: regex}
        ],
        $and: [
            {estado: true}
        ]
    }).populate("usuario", "nombre");

    res.json({
        count: categorias.length,
        results: categorias
    });
}

const buscarProducto = async (termino = "", req = request, res = response) => {
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ) {
        const producto = await Producto.findById( termino ).populate("categoria", "nombre").populate("usuario", "nombre");
        return res.json({
            count: 1,
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp(termino, "i");
    const productos = await Producto.find({
        $or: [
            {nombre: regex},
            {descripcion: regex}
        ],
        $and: [
            {estado: true}
        ]
    }).populate("categoria", "nombre").populate("usuario", "nombre");

    res.json({
        count: productos.length,
        results: productos
    });
}


module.exports = {
    buscar
};
