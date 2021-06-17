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
        ref:      'Users',
        required: true
    }

});

CategoriesSchema.methods.toJSON = function () {

    const { __v, status, ...categories } = this.toObject();
    return categories;
}

module.exports = model('Categories', CategoriesSchema );
