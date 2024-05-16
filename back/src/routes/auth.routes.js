const express = require('express');

const upload = require('../libs/multer');
const { checkUniqueValue, checkValidations } = require('../libs/validations');

const User = require('../models/user.model');
const { _signup, _login } = require('../controllers/auth.controller');

const { body } = require('express-validator');

const router = express.Router();

router.post('/signup', upload.none(), [
    body('email').exists().withMessage(`El 'email' es requerido`).isEmail().withMessage('El email no es válido'),
    body('username').exists().withMessage(`El 'username' es requerido`),
    body('password').exists().withMessage(`El 'password' es requerido`).isLength({
        min: 6
    }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').exists().withMessage(`El 'rol' es requerido`),
    checkUniqueValue('email', User),
    checkUniqueValue('username', User)
], checkValidations, _signup);
router.post('/login', upload.none(), _login);

module.exports = router;