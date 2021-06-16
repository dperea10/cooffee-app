const { response, request } = require('express');
const bcryptjs              = require('bcryptjs');
const User                  = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const {limit = 5, from = 0 } = req.query; 
    const query  = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User( {
        name, email, password, role
    } );

    //Encript Password
    const salt      = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    //Save DB
    await user.save();

    res.json( {user} );
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;

    if ( password ) {

        //Encript Password
        const salt    = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync( password, salt);
    }

    const userUpdate = await User.findByIdAndUpdate( id, data );


    res.json( userUpdate );
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;
    // Delete complete
    // const user = await User.findByIdAndDelete(id);

    //Delete "lógico", change estatus
    const user      = await User.findByIdAndUpdate( id, {status:false} );

    res.json({
        user
    });
}




module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}