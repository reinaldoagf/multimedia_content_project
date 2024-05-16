// database.js

const mongoose = require('mongoose');

const connectDB = async () => {
    const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/multimedia_content'
    const CONFIG = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    // Establish Connection
    mongoose.connect(DATABASE_URL, CONFIG)
    
    require('./src/models/rol.model');
    require('./src/models/user.model');
    require('./src/models/theme-type.model');
    require('./src/models/content-category.model');
    require('./src/models/content.model');
    
    // Events for when connection opens/disconnects/errors
    mongoose.connection
        .on("open", () => console.log("Connected to Mongoose"))
        .on("close", () => console.log("Disconnected from Mongoose"))
        .on("error", (error) => console.log(error))
};

module.exports = connectDB;