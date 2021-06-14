const { response }     = require('express');
const bcryptjs         = require('bcryptjs');
const User             = require('../models/user');
const { generateJWT }  = require('../helpers/generateJWT');
const { generateGoogleToken } = require('../helpers/generateGoogleToken');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Validate email
        const user = await User.findOne( {email} );
        if ( !user ) {
            return res.status(400).json({
                msg: 'User or Password incorrect!'
            });
        }

        //Validate Status users
        if ( user.status === false ) {
            return res.status(400).json({
                msg: 'User or Password incorrect! status'
            });
        }

        // Validate password
        const validatePassword = bcryptjs.compareSync(password, user.password)
        if ( !validatePassword ) {
            return res.status(400).json({
                msg: 'User or Password incorrect! password'
            });
        }

        // JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Bad conection'
        })
    }
}

const validateGoogleToken = async ( req, res = response ) => {

    const { id_token } = req.body;

    try {
        const { email, name, image } = await generateGoogleToken( id_token );

        //Validate user vs BD
        let user = await User.findOne( {email} );

        if ( !user ) {

            const data = {
                name, 
                email, 
                image, 
                password: 'v', 
                google: true
            };

            user = new User( data );
            await user.save();
        }

        //Valdiate status DB
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Contact the administrator!'
            })
        }

         // JWT
        const token = await generateJWT( user.id );

        res.json({
            user, 
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Google Token is invalid!'
        })
    }


}

module.exports = {

    login,
    validateGoogleToken
};
