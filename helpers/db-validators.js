const { Usuario } = require("../models");
const { Role }= require("../models");
const { Categoria } = require("../models");
const { Producto } = require("../models");


const esRoleValido = async (item = "") => {
    const existe = await Role.findOne({ rol: item });
    if( !existe ) {
        throw new Error(`El rol '${ item }' no existe`);
    }
}

const existeCorreo = async (item = "") => {
    const existe = await Usuario.findOne({correo: item});
    if( existe ) {
        throw new Error(`El correo '${ item }' ya ha sido registrado con anterioridad`);
    }
}

const existeUsuarioPorID = async (item = "") => {
    const existe = await Usuario.findById( item );
    if( !existe ) {
        throw new Error(`El usuario con id '${ item }' no existe`);
    }
}

const existeCategoriaPorID = async (item = "") => {
    const existe = await Categoria.findById( item );
    if ( !existe ) {
        throw new Error(`La categoria con id '${ item }' no existe`);
    }
}

const existeProductoPorID = async (item = "") => {
    const existe = await Producto.findById( item );
    if ( !existe ) {
        throw new Error(`El producto con id '${ item }' no existe`);
    }
}

const listaCatalogos = async (catalogo = "", lista = []) => {
    const incluida = lista.includes( catalogo );

    if( !incluida ) {
        throw new Error(`La coleccion ${catalogo} no esta permitida`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    listaCatalogos
}
