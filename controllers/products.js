const { response, request } = require('express');
const { Products }          = require('../models');


// get all Product, 
const getAllProduct = async (req = request, res = response) => {

    const {limit = 5, from = 0 } = req.query; 
    const query  = { status: true };

    const [ total, products ] = await Promise.all([
        Products.countDocuments(query),
        Products.find(query)
            .populate('user', 'name')
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        products
    });
}

//Get Products for IDs
const getIdProduct = async (req = request, res = response) => {

    const { id } = req.params; 

    const products = await Products.findById( id ).populate('user', 'name');

    res.json( {products} );
}

const createProduct = async (req, res = response) => {

    const { status, user, ...body } = req.body;
    const productDB = await Products.findOne( { name: body.name } );

    if ( productDB ) {
        return res.status(400).json({
            msg: `Product ${productDB.name}, exist!`
        });
    }

    const data = {
        ...body,
        name: body.name.toLowerCase(),
        user: req.user._id,
    }
    
    const products = new Products( data );

    //Save DB
    await products.save();

    res.status(201).json( products );
}

const updateProduct = async (req, res = response) => {

    const { id }                 = req.params;
    const { _id, user, ...data } = req.body;
    data.name                    = req.body.name.toUpperCase();
    data.user                    = req.user._id;

    const productUpdate = await Products.findByIdAndUpdate( id, data, {new: true} );

    res.json( productUpdate );
}

const deleteProduct = async (req, res = response) => {

    const { id } = req.params;

    const products = await Products.findByIdAndUpdate( id, {status:false}, {new: true} );

    res.json({
        products
    });
}

module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getIdProduct
}
