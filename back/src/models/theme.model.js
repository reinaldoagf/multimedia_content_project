const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

// Definir el esquema del rol
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        default: null,
        type: Schema.Types.ObjectId,
        ref: 'ContentCategory'
    },    
    type: {
        default: null,
        type: Schema.Types.ObjectId,
        ref: 'ThemeType'
    },
}, {
    versionKey: false,
    timestamps: true,
});

// Crear el modelo "Theme" a partir del esquema definido
const Theme = mongoose.model('Theme', schema);

// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
module.exports = Theme;