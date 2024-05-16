// Rol.js

const Rol = require('../models/rol.model');

const seed = async () => {
  let elements = [
    { key: 'admin', value: 'administrador' },
    { key: 'reader', value: 'lector' }, // lector
    { key: 'creator', value: 'creador' }, // creador
    // Otros elementos
  ];

  try {
    await Rol.deleteMany(); // Borra todos los elements existentes
    await Rol.insertMany(elements);
    console.log('Rols seeded successfully');
  } catch (err) {
    console.error(err);
  }
};

module.exports = seed;