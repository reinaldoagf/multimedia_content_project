// drop.js
require('dotenv').config()

const mongoose = require('mongoose');
const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/multimedia_content'

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

mongoose.connection.dropDatabase().then(
    async () => {
        try {
            mongoose.connection.close()

        } catch (err) {
            console.log(err)
        }
    }
);