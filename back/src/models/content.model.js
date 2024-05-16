const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

// Definir el esquema del content
const schema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es requerido']
    },
    file_url: {
        type: String,
        required: false
    },
    file_path: {
        type: String,
        required: false
    },
    url_video: {
        type: String,
        required: false
    },
    theme: {
        type: Schema.Types.ObjectId,
        ref: 'Theme'
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
}, {
    versionKey: false,
    timestamps: true,
});

// Crear el modelo "Content" a partir del esquema definido
const Content = mongoose.model('Content', schema);

// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
module.exports = Content;