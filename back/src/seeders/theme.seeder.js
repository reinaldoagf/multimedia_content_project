// Theme.js

const ContentCategory = require('../models/content-category.model');
const ThemeType = require('../models/theme-type.model');
const Theme = require('../models/theme.model');



const seed = async () => {
    let elements = [
        { name: 'ciencias' },
        { name: 'matemáticas' }, 
        { name: 'deporte' }, 
        // Otros elementos
    ];

    try {
        await Theme.deleteMany(); // Borra todos los elements existentes

        const futbolCategory = await ContentCategory.findOne({
            name:'futbol'
        });

        elements = elements.map((element) => {
            switch (element.name) {
                case 'deporte':
                    return {
                        ...element, category: futbolCategory
                    };
                default:
                    return {
                        ...element
                    };
            }
        });

        const imagesType = await ThemeType.findOne({
            name: 'images'
        });
        const videosType = await ThemeType.findOne({
            name:'videos'
        });

        elements = elements.map((element) => {
            switch (element.name) {
                case 'deporte':
                    return {
                        ...element, type: imagesType
                    };
                case 'ciencias':
                    return {
                        ...element, type: videosType
                    };
                default:
                    return {
                        ...element
                    };
            }
        });


        await Theme.insertMany(elements);
        console.log('Themes seeded successfully');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seed;