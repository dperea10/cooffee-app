const { Router } = require('express');
const { check }  = require('express-validator');

const { login, validateGoogleToken }  = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login', [
    check('email', 'Email is obligatory!').isEmail(),
    check('password','Email is obligatory!' ).notEmpty(),
    validateFields
], login );

router.post('/google', [
    check('id_token', 'Google Token is obligatory!').notEmpty(),
    validateFields
], validateGoogleToken );


module.exports = router;