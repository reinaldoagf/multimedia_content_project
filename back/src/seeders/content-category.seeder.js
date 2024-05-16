// ContentCategory.js

const ContentCategory = require('../models/content-category.model');


const seed = async () => {
  let elements = [
    { name: 'futbol', image_url: 'https://inovafit-com-mx.s3.us-west-2.amazonaws.com/wp-content/uploads/2018/06/01175419/fucho.jpg' },
    { name: 'beisbol', image_url: 'https://d1z5o5vuzqe9y4.cloudfront.net/uploads/Baseball-and-The-Tenth-Inning/Barry-Bonds-connects-June-2001-Brad-Mangin-1.jpg' }, 
    { name: 'baloncesto', image_url: 'https://baquetbol.wordpress.com/wp-content/uploads/2018/10/basquetbol.jpg' }, 
    // Otros elementos
  ];
  
  try {
    await ContentCategory.deleteMany(); // Borra todos los elements existentes
    await ContentCategory.insertMany(elements);
    console.log('ContentCategory seeded successfully');
  } catch (err) {
    console.error(err);
  }
};

module.exports = seed;