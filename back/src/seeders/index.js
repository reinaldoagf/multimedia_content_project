// seeders.js

const mongoose = require('mongoose');
// Seeders importados
const seedRols = require('./rol.seeder'); 
const seedUsers = require('./user.seeder');
const seedContentCategories = require('./content-category.seeder');
const seedThemeTypes = require('./theme-type.seeder');
const seedThemes = require('./theme.seeder');
const seedContent = require('./content.seeder');

// Función principal asincrónica
async function seedDatabase() {
  try {
    const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/multimedia_content'
    const CONFIG = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    // Establish Connection
    mongoose.connect(DATABASE_URL, CONFIG)
    
    // Ejecutar los seeders
    await seedRols();
    await seedUsers();
    await seedContentCategories();
    await seedThemeTypes();
    await seedThemes();
    await seedContent();

    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    // Después de ejecutar los seeders, cierra la conexión a la base de datos
    mongoose.connection.close();
  }
}

// Llamar a la función principal asincrónica
seedDatabase();