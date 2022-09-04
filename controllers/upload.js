const fs = require("fs");
const path = require("path");

const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req = request, res = response) => {
    try {
        const filename = await subirArchivo(req.files, ["png","jpg","jpeg","gif","bmp","ico"], "");
        res.json({
            filename
        });
    }
    catch( err ) {
        res.status(500).json({
            msg: err
        });
    }
};

const actualizaImagen = async (req = request, res = response) => {
    const {coleccion, id} = req.params;
    
    let modelo;

    switch( coleccion ) {
        case "usuario":
            modelo = await Usuario.findById( id );
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el usuario con id ${id}`
                });
            }

            break;
        case "producto":
            modelo = await Producto.findById( id );
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el producto con id ${id}`
                });
            }

            break;
        default:
            return res.status(500).json({
                msg: "Esta accion aun no ha sido implementada"
            });

            break;
    }

    if( modelo.img ) {
        const filePath = path.join(__dirname, "../uploads/", coleccion, modelo.img);
        if( fs.existsSync(filePath) ) {
            fs.unlinkSync( filePath );
        }
    }

    const filename = await subirArchivo(req.files, ["png","jpg","jpeg","gif","bmp","ico"], coleccion);
    
    modelo.img = filename;
    modelo.save();

    res.json({
        modelo
    });
};

const descargaImagen = async (req = request, res = response) => {
    const {coleccion, id} = req.params;
    
    const noImage = path.join(__dirname, "../assets/no-image.jpg");
    let modelo;

    switch( coleccion ) {
        case "usuario":
            modelo = await Usuario.findById( id );
            if( !modelo ) {
                return res.sendFile( noImage );
            }

            break;
        case "producto":
            modelo = await Producto.findById( id );
            if( !modelo ) {
                return res.sendFile( noImage );
            }

            break;
        default:
            return res.sendFile( noImage );

            break;
    }

    if( modelo.img ) {
        const filePath = path.join(__dirname, "../uploads/", coleccion, modelo.img);
        if( fs.existsSync(filePath) ) {
            return res.sendFile( filePath );
        }
    }
    
    return res.sendFile( noImage );
}


module.exports = {
    cargarArchivo,
    actualizaImagen,
    descargaImagen
};

