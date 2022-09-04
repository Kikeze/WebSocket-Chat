const { v4: uuidv4 } = require("uuid");
const path = require("path");


const subirArchivo = (files, extensionesValidas = ["txt","doc"], carpeta = "") => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const partes = archivo.name.split(".");
        const extension = partes[partes.length - 1];

        if( !extensionesValidas.includes(extension) ) {
            reject(`La extension ${ extension } no esta permitida`);
            return;
        }

        let uniqueName = uuidv4() + "." + extension;
        let uploadPath = path.join(__dirname, '../uploads/', carpeta, uniqueName);
        
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject( err );
                return;
            }

            resolve(uniqueName);
        });
    });

};


module.exports = {
    subirArchivo
};

