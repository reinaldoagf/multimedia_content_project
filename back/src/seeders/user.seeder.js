
const bcrypt = require('bcryptjs');

const Rol = require('../models/rol.model');
const User = require('../models/user.model');

const seed = async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('12345678', salt);

    let elements = [{
            username: 'admin',
            email: 'admin@example.com',
            password: hash
        }, {
            username: 'user1',
            email: 'user1@example.com',
            password: hash
        }, {
            username: 'user2',
            email: 'user2@example.com',
            password: hash
        },
        // Otros usuarios
    ];

    try {
        await User.deleteMany(); // Borra todos los elementos existentes

        const adminRol = await Rol.findOne({
            key: 'admin'
        });
        const readerRol = await Rol.findOne({
            key: 'reader'
        });
        const creatorRol = await Rol.findOne({
            key: 'creator'
        });

        elements = elements.map((element) => {
            switch (element.username) {
                case 'admin':
                    return {
                        ...element, rol: adminRol
                    };
                case 'user1':
                    return {
                        ...element, rol: readerRol
                    };
                case 'user2':
                    return {
                        ...element, rol: creatorRol
                    };
                default:
                    return {
                        ...element
                    };
            }
        });

        await User.insertMany(elements);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seed;