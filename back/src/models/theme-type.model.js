const mongoose = require('mongoose');

// Definir el esquema del content category
const schema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['images', 'videos', 'text'],
        default: 'images'
    }
}, {
    versionKey: false,
    timestamps: true,
});

// Crear el modelo "ThemeType" a partir del esquema definido
const ThemeType = mongoose.model('ThemeType', schema);

// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
module.exports = ThemeType;