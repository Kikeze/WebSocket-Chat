const {request, response} = require("express");
const { Producto, Categoria } = require("../models");


const productoGetAll = async (req = request, res = response) => {
    const page = (req.query.page) ? Number(req.query.page) : 1;
    const limite = (req.query.limit) ? Number(req.query.limit) : 5;

    const filter = { estado: true };
    
    const [count, productos] = await Promise.all([
        Producto.countDocuments( filter ),
        Producto.find( filter )
            .populate("categoria", "nombre")
            .populate("usuario", "nombre")
            .skip( (page -1 ) * limite )
            .limit( limite )
    ]);

    res.json({count, productos});
};

const productoGetOne = async (req = request, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findById( id ).populate("categoria", "nombre").populate("usuario", "nombre");

    res.json( producto );
};

const productoPost = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const disponible = req.body.disponible;
    const categoria = req.body.categoria;

    const producto = await Producto.findOne({ nombre });

    if( producto ) {
        return res.status(400).json({
            msg: `El producto ${ nombre } ya existe`
        });
    }

    const data = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        disponible: disponible,
        categoria: categoria,
        usuario: req.usuario._id
    };

    const newProducto = new Producto( data );
    await newProducto.save();

    res.json( newProducto );
};

const productoPut = async (req = request, res = response) => {
    const id = req.params.id;
    const {estado, usuario, ...data} = req.body;

    if( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }

    if( data.categoria ) {
        const categoria = Categoria.findById( data.categoria );
        if( !categoria ) {
            return res.status(400).json({
                msg: `La categoria ${ data.categoria } no existe`
            });
        }
    }

    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id, data).populate("categoria","nombre").populate("usuario", "nombre");

    res.json( producto );
};

const productoDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const data = {
        estado: false,
        usuario: req.usuario._id
    };
    const producto = await Producto.findByIdAndUpdate(id, data).populate("categoria","nombre").populate("usuario", "nombre");

    res.json( producto );
};


module.exports = {
    productoGetAll,
    productoGetOne,
    productoPut,
    productoPost,
    productoDelete
};
