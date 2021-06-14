const Role = require('../models/role');
const User = require('../models/user');

//Validate roles
const isRoleValidate = async (role = '') => {

    const roleValidate = await Role.findOne({ role });
    if (!roleValidate) throw new Error(`Role ${ role } is not valid!` );

}

 //Validate email
const isEmailValidate = async ( email = '' ) => {

    const emailValidate = await User.findOne({ email });
    if (emailValidate) throw new Error(`Email ${ email } exist in DB!` );
}

 //Validate ID
 const isIdValidate = async ( id ) => {

    const idValidate = await User.findById(id).exec();
    if ( !idValidate ) throw new Error(`ID ${ id }, not exist!` );
}


 module.exports = {

    isRoleValidate,
    isEmailValidate,
    isIdValidate

 }