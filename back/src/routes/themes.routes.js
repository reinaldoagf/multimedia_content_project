const express = require('express');

const upload = require('../libs/multer');
const { checkUniqueValue, checkValidations } = require('../libs/validations');

const Theme = require('../models/theme.model');
const { _all, _create, _update, _delete } = require('../controllers/themes.controller');

const { body } = require('express-validator');

const router = express.Router();

/* GET themes listing. */

router.get('/', _all);
router.post('/', upload.none(), [
    body('name').exists().withMessage(`El 'nombre' es requerido`),
    checkUniqueValue('name', Theme)
], checkValidations, _create);
router.put('/:id', upload.none(),[
    body('name').exists().withMessage(`El 'nombre' es requerido`),
    checkUniqueValue('name', Theme)
], _update);
router.delete('/:id', _delete);

module.exports = router;