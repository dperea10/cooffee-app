const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields, 
        validateJWT,
        validateAdminRole } = require('../middlewares');

const { isIdCategoryValidate } = require('../helpers/db-validator');

const { createCategory,
        getAllCategory,
        updateCategory,
        deleteCategory,
        getIdCategory } = require('../controllers/categories');


const router = Router();

//get all categories
router.get('/', getAllCategory);

//get category for Ids
router.get('/:id',[
    check('id', 'ID Category is no valid!').isMongoId(),
    check('id').custom( isIdCategoryValidate ),
    validateFields
], getIdCategory);

//Create categories
router.post('/create', [
    validateJWT,
    check('name', 'Name is empty!').not().isEmpty(),
    validateFields
] ,createCategory );

//Update Categories
router.put('/:id', [
    validateJWT,
    check('id', 'ID Category is no valid!').isMongoId(),
    check('name', 'Name is empty!').not().isEmpty(),
    check('id').custom( isIdCategoryValidate ),
    validateFields
], updateCategory );

// Delete Category 
router.delete('/:id',[
    validateJWT,
    validateAdminRole,
    check('id', 'ID is no valid!').isMongoId(),
    check('id').custom( isIdCategoryValidate ),
    validateFields

], deleteCategory );


module.exports = router;

