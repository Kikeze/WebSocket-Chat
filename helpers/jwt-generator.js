const jwt = require("jsonwebtoken");


const generarJWT = ( uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "18h"
            },
            (err, token) => {
                if( err ) {
                    console.log(err);
                    reject("Imposible continuar con la operacion solicitada");
                }
                else {
                    resolve( token );
                }
            });
    });
};


module.exports = {
    generarJWT
}











