const {User, Categories, Products } = require('../models');
const Role = require('../models/role');


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

 //Validate ID User
 const isIdValidate = async ( id ) => {

    const idValidate = await User.findById(id).exec();
    if ( !idValidate ) throw new Error(`ID ${ id }, not exist!` );
}

 //Validate ID Category
 const isIdCategoryValidate = async ( id ) => {

    const idCategoryValidate = await Categories.findById(id).exec();
    if ( !idCategoryValidate ) throw new Error(`ID ${ id }, not exist!` );
}


 //Validate ID Products
 const isIdProductsValidate = async ( id ) => {

    const idProductValidate = await Products.findById(id).exec();
    if ( !idProductValidate ) throw new Error(`ID ${ id }, not exist!` );
}


 module.exports = {

    isRoleValidate,
    isEmailValidate,
    isIdValidate,
    isIdCategoryValidate,
    isIdProductsValidate

 }