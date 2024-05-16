const express = require('express');

const upload = require('../libs/multer');
const { checkUniqueValue, checkValidations } = require('../libs/validations');

const User = require('../models/user.model');
const { _all, _create } = require('../controllers/users.controller');

const { body } = require('express-validator');

const router = express.Router();

/* GET content categories listing. */
// Middleware para validar y sanitizar los datos de las solicitudes
router.get('/', _all);
router.post('/', upload.none(), [
    body('email').exists().withMessage(`El 'email' es requerido`).isEmail().withMessage('El email no es válido'),
    body('username').exists().withMessage(`El 'username' es requerido`),
    body('password').exists().withMessage(`El 'password' es requerido`).isLength({
        min: 6
    }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    checkUniqueValue('email', User),
    checkUniqueValue('username', User)
], checkValidations, _create);

module.exports = router;