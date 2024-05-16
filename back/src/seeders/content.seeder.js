// Content.js

const Theme = require('../models/theme.model');
const User = require('../models/user.model');
const Content = require('../models/content.model');


const seed = async () => {
  let elements = [
    { title: 'Futbol de Europa' },
    { title: 'Jugadas de Messi' }, 
    { title: 'Copa Mundial de Fútbol de 2022' },
    { title: 'Teoría del Big Bang' }, 
    // Otros elementos
  ];

  const sportTheme = await Theme.findOne({
      name:'deporte'
  });

  const sciencesTheme = await Theme.findOne({
      name:'ciencias'
  });

  const user = await User.findOne({
      username:'admin'
  });

  elements = elements.map((element) => {
    switch (element.title) {
      case 'Futbol de Europa':
      case 'Jugadas de Messi':
      case 'Copa Mundial de Fútbol de 2022':
        return {
          ...element,
          theme: sportTheme,
          user
        };
      case 'Teoría del Big Bang':
        return {
          ...element,
          theme: sciencesTheme,
          user
        };
      default:
        return { ...element };
    }
  });
  
  try {
    await Content.deleteMany(); // Borra todos los elements existentes
    await Content.insertMany(elements);
    console.log('Content seeded successfully');
  } catch (err) {
    console.error(err);
  }
};

module.exports = seed;