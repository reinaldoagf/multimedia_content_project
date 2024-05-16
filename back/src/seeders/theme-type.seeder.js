// ThemeType.js

const ThemeType = require('../models/theme-type.model');



const seed = async () => {
  let elements = [
    { name: 'images' },
    { name: 'videos' }, 
    { name: 'text' }, 
    // Otros elementos
  ];
  
  try {
    await ThemeType.deleteMany(); // Borra todos los elements existentes
    await ThemeType.insertMany(elements);
    console.log('ThemeType seeded successfully');
  } catch (err) {
    console.error(err);
  }
};

module.exports = seed;