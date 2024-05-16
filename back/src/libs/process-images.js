const sharp = require('sharp'); // Biblioteca para procesamiento de imágenes
const path = require('path');
const fs = require('fs');

// Middleware para procesar la imagen antes de guardarla
function processImage(req, res, next) {
    if (!req.file) {
        return next(); // Si no hay archivo, pasar al siguiente middleware
    }

    // Ruta de la imagen original
    const imagePath = path.join(path.resolve(__dirname, '../..'), 'uploads', req.file.filename);


    // Ruta donde se guardará la imagen comprimida
    const compressedImagePath = path.join(path.resolve(__dirname, '../..'), 'uploads', 'compressed_' + req.file.filename);

            // Comprimir la imagen utilizando Sharp
    sharp(imagePath)
    .resize(800) // Redimensionar la imagen a un máximo de 800 píxeles de ancho o alto
    .jpeg({ quality: 70 }) // Configurar calidad JPEG al 70%
    .toFile(compressedImagePath, (err, info) => {
        if (err) {
            console.error('Error al comprimir la imagen:', err);
            return next(err);
        }

        // Eliminar la imagen original después de comprimirla
        /* fs.unlinkSync(imagePath); */

        // Actualizar la ruta del archivo en el objeto de solicitud para que apunte a la imagen comprimida
        req.file.filename = 'compressed_' + req.file.filename;
        req.file.path = compressedImagePath;

        next();
    });

    
}

module.exports = {
    processImage,
};