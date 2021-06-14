const { response, request } = require('express');
const jwt  = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('api-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Token invalid'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY );

        // validate user 
        const user = await User.findById( uid );

        if( !user ) {
            return res.status(401).json({
                msg: ' User invalid!'
            })
        }

        if( !user.status ) {
            return res.status(200).json({
                msg: 'User deleted'
            })
        }

        req.user = user;

        next();

    } catch (err) {
        
    }
}

module.exports = {
    validateJWT
}