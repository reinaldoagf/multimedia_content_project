const express = require('express');

const upload = require('../libs/multer');
const { checkValidations } = require('../libs/validations');
const { processImage } = require('../libs/process-images');

const { _all, _create } = require('../controllers/content.controller');

const { body } = require('express-validator');

const router = express.Router();

/* GET content listing. */
// Middleware para validar y sanitizar los datos de las solicitudes
router.get('/', _all);
router.post('/', upload.single('file'), [
    body('title').exists().withMessage(`El 'titulo' es requerido`),
], checkValidations, (req, res) => {
    // El middleware de Multer ya habrá procesado el archivo, así que no necesitas invocar upload como una función aquí
    if (req.fileValidationError) {
        console.error('Error al subir el archivo:', req.fileValidationError);
        return res.status(400).json({ error: req.fileValidationError });
    }

    // Si todo va bien, continuar con el siguiente middleware para procesar la imagen
    processImage(req, res, () => {
        _create(req, res)
    });
});

module.exports = router;
