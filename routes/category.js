const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { isIdCategoryValidate }        = require('../helpers/db-validator');

const { createCategory,
        getAllCategory,
        updateCategory,
        deleteCategory } = require('../controllers/categories');


const router = Router();

//get Categories

router.get('/', getAllCategory);


router.post('/create', [
    validateJWT,
    check('name', 'Name is empty!').not().isEmpty(),
    validateFields
] ,createCategory );


router.put('/:id', [
    check('id', 'ID Category is no valid!').isMongoId(),
    check('id').custom( isIdCategoryValidate ),
    validateFields
], updateCategory );

router.delete('/:id',[
    validateJWT,
    check('id', 'ID is no valid!').isMongoId(),
    check('id').custom( isIdCategoryValidate ),
    validateFields

], deleteCategory );


module.exports = router;

