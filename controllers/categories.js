const { response, request } = require('express');
const { Categories }        = require('../models');

// get all category, 
const getAllCategory = async (req = request, res = response) => {

    const {limit = 5, from = 0 } = req.query; 
    const query  = { status: true };

    const [ total, categories ] = await Promise.all([
        Categories.countDocuments(query),
        Categories.find(query)
            .populate('user', 'name')
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        categories
    });
}

//Get Categories for IDs
const getIdCategory = async (req = request, res = response) => {

    const { id } = req.params; 

    const category = await Categories.findById( id ).populate('user', 'name');

    res.json( {category} );
}

const createCategory = async (req, res = response) => {

    const name       = req.body.name.toUpperCase();
    const categoryDB = await Categories.findOne( { name } );

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `Category ${categoryDB.name}, exist!`
        });
    }

    const data = {
        name, 
        user: req.user._id,
    }
    
    const category = new Categories( data );

    //Save DB
    await category.save();

    res.status(201).json( category );
}

const updateCategory = async (req, res = response) => {

    const { id }                 = req.params;
    const { _id, user, ...data } = req.body;
    data.name                    = req.body.name.toUpperCase();
    data.user                    = req.user._id;

    const categoryUpdate = await Categories.findByIdAndUpdate( id, data,  {new: true} );

    res.json( categoryUpdate );
}

const deleteCategory = async (req, res = response) => {

    const { id } = req.params;

    const category = await Categories.findByIdAndUpdate( id, {status:false}, {new: true} );

    res.json({
        category
    });
}

module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getIdCategory
}
