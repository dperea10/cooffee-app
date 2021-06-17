const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { isIdProductValidate }        = require('../helpers/db-validator');

const { createProduct,
        getAllProduct,
        updateProduct,
        deleteProduct,
        getIdProduct } = require('../controllers/categories');


const router = Router();

//get all categories
router.get('/', getAllProduct);

//get category for Ids
router.get('/:id',[
    check('id', 'ID Category is no valid!').isMongoId(),
    check('id').custom( isIdProductValidate ),
    validateFields
], getIdProduct);

//Create categories
router.post('/create', [
    validateJWT,
    check('name', 'Name is empty!').not().isEmpty(),
    validateFields
] ,createProduct );

//Update Categories
router.put('/:id', [
    validateJWT,
    check('id', 'ID Category is no valid!').isMongoId(),
    check('name', 'Name is empty!').not().isEmpty(),
    check('id').custom( isIdProductValidate ),
    validateFields
], updateProduct );

// Delete Category 
router.delete('/:id',[
    validateJWT,
    validateAdminRole,
    check('id', 'ID is no valid!').isMongoId(),
    check('id').custom( isIdProductValidate ),
    validateFields

], deleteProduct );


module.exports = router;

