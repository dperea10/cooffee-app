const {Schema, model} = require('mongoose');


const CategoriesSchema = Schema({
    
    name: {
        type: String,
        required: [true, 'User is obligatory']
    },
    status: {
        type:     Boolean,
        default:  true,
        required: true
    },
    user: {
        type:     Schema.Types.ObjectId,
        ref:      'User',
        required: true
    }

});

module.exports = model('Categories', CategoriesSchema );
