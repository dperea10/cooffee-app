const { Router } = require('express');
const { check }  = require('express-validator');

const { isRoleValidate, 
        isEmailValidate, 
        isIdValidate 
} = require('../helpers/db-validator');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch   
} = require('../controllers/users');

const { validateFields,
        validateJWT,
        validateAdminRole,
        getRoles
} = require('../middlewares');

const router = Router();


router.get('/', usersGet );

router.put('/:id', [
    check('id', 'ID is no valid!').isMongoId(),
    check('id').custom( isIdValidate ),
    check('role').custom( isRoleValidate ),
    validateFields
], usersPut );

router.post('/', [
    check('name', 'Name is empty!').not().isEmpty(),
    check('password', 'Password is min 6 char!').isLength({ min: 6 }),
    check('email').custom( isEmailValidate ),
    check('role').custom( isRoleValidate ),
    validateFields

] ,usersPost );

router.delete('/:id',[
    validateJWT,
    validateAdminRole,
    getRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'ID is no valid!').isMongoId(),
    check('id').custom( isIdValidate ),
    validateFields

], usersDelete );

router.patch('/', usersPatch );

module.exports = router;
