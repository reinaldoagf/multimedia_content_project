const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = 'uploads';
        // Verificar si la carpeta no existe
        if (!fs.existsSync(folder)) {
            // Crear la carpeta si no existe
            fs.mkdirSync(folder);
            console.log(`La carpeta '${folder}' ha sido creada.`);
        }
        cb(null, folder); // Directorio donde se guardarán los archivos subidos
    },
    filename: function (req, file, cb) {
        // Renombrar el archivo para evitar conflictos de nombres
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Función para verificar el tipo de archivo
function checkFileType(file, cb) {
    // Extensiones permitidas
    const filetypes = /jpeg|jpg|png|gif/;
    // Verificar la extensión
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Verificar el tipo MIME
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Solo se permiten imágenes');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;
