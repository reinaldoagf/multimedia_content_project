const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

// Definir el esquema del content category
const schema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerida'],
        unique: [true, 'El nombre ya existe']
    },
    image_url: {
        type: String,
        required: false
    },
    image_path: {
        type: String,
        required: false
    },
}, {
    versionKey: false,
    timestamps: true,
});

// Crear el modelo "ContentCategory" a partir del esquema definido
const ContentCategory = mongoose.model('ContentCategory', schema);

// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
module.exports = ContentCategory;