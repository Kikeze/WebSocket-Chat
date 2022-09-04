const {Schema, model} = require("mongoose");


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        default: 0
    },
    disponible: {
        type: Boolean,
        default: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    img: {
        type: String
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, ...producto } = this.toObject();

    return producto;
}


module.exports = model("Producto", ProductoSchema);

