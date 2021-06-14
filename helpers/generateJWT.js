const jwt = require('jsonwebtoken');


const generateJWT = ( uid = '' ) => {

    return new Promise ( (resolve, reject) => {
    
        const payload = { uid };
    
        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log( err);
                reject( 'No genereate Token',err);
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = {
    generateJWT
}
