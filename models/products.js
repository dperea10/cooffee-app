const {Schema, model} = require('mongoose');


const ProductsSchema = Schema({
    
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
    },
    category: {
        type:     Schema.Types.ObjectId,
        ref:      'Categories',
        required: true
    },
    price: {
        type:     Number,
        default:  0,
        required: true
    },
    description: {
        type:     String,
    },
    active: {
        type:     Boolean,
        default:  true
    }

});

ProductsSchema.methods.toJSON = function () {

    const { __v, status, ...Products } = this.toObject();
    return Products;
}

module.exports = model('Products', ProductsSchema );
