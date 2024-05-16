const express = require('express');

const upload = require('../libs/multer');
const { checkUniqueValue, checkValidations } = require('../libs/validations');

const ContentCategory = require('../models/content-category.model');
const { _all, _create, _update, _delete } = require('../controllers/content-categories.controller');

const { body } = require('express-validator');

const router = express.Router();

/* GET content categories listing. */
// Middleware para validar y sanitizar los datos de las solicitudes
router.get('/', _all);
router.post('/', upload.single('file'), [
    body('name').exists().withMessage(`El 'nombre' es requerido`),
    checkUniqueValue('name', ContentCategory)
], checkValidations, _create);
router.put('/:id', upload.single('file'), _update);
router.delete('/:id', _delete);

module.exports = router;