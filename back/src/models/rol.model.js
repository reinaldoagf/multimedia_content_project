const mongoose = require('mongoose');

// Definir el esquema del rol
const schema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String,
    required: true,
    unique: true
  }
}, {
  versionKey: false,
  timestamps: true,
});

// Crear el modelo "Rol" a partir del esquema definido
const Rol = mongoose.model('Rol', schema);

// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
module.exports = Rol;