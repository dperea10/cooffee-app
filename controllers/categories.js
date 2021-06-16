const { response, request } = require('express');
const { Categories }        = require('../models');

const getAllCategory = async (req = request, res = response) => {

    const {limit = 5, from = 0 } = req.query; 
    const query  = { status: true };

    const [ total, category ] = await Promise.all([
        Categories.countDocuments(query),
        Categories.find(query)
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        category
    });
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
   
    const categoryUpdate = await Categories.findByIdAndUpdate( id, data );

    res.json( categoryUpdate );
}

const deleteCategory = async (req, res = response) => {

    const { id } = req.params;

    const category = await Categories.findByIdAndUpdate( id, {status:false} );

    res.json({
        category
    });
}

module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}
