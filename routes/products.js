const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields,
        validateJWT,
        validateAdminRole}     = require('../middlewares');

const { isIdProductsValidate, isIdCategoryValidate } = require('../helpers/db-validator');

const { createProduct,
        getAllProduct,
        updateProduct,
        deleteProduct,
        getIdProduct } = require('../controllers/products');

const router = Router();

//get all Products
router.get('/', getAllProduct);

//get Products for Ids
router.get('/:id',[
    check('id', 'ID Products is no valid!').isMongoId(),
    check('id').custom( isIdProductsValidate ),
    validateFields
], getIdProduct);

//Create Products
router.post('/create', [
    validateJWT,
    check('name', 'Name is empty!').not().isEmpty(),
    check('category', 'Categoryis not valid!').isMongoId(),
    check('category').custom( isIdCategoryValidate ),
    validateFields
] ,createProduct );

//Update Products
router.put('/:id', [
    validateJWT,
    check('category', 'Categoryis not valid!').isMongoId(),
    check('id').custom( isIdProductsValidate ),
    validateFields
], updateProduct );

// Delete Products 
router.delete('/:id',[
    validateJWT,
    validateAdminRole,
    check('id', 'ID is no valid!').isMongoId(),
    check('id').custom( isIdProductsValidate ),
    validateFields

], deleteProduct );


module.exports = router;

