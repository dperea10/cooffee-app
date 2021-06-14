
const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    
    name: {
        type: String,
        required: [true, 'User is obligatory']
    },
    email: {
        type: String,
        required: [true, 'Email is obligatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is obligatory'],
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON = function () {

    const { __v, password,_id, ...user } = this.toObject();
        user.uid = _id;
    return user;
}

module.exports = model('Users', UserSchema );
