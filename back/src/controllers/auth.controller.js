const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports._signup = async (req, res) => {
    try {
        const { email, password, username, rol } = req.body;

        // Verificar si el correo electrónico ya está en uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Crear un nuevo usuario
        const newUser = new User({ email, password, username, rol });

        // Guardar el nuevo usuario en la base de datos
        const user = await newUser.save();
        const data = await User.findById(user._id).populate({path:"rol"});

        // Generar un token de acceso
        const accessToken = jwt.sign({ 
            user: {
                "_id": data._id,
                "username": data.username,
                "email": data.email,
                "rol": data.rol,
            }
         }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token de acceso
        return res.status(200).json({
            message: 'Operación exitosa',
            token: accessToken
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports._login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate({path:"rol"});

        if (!user) {
            return res.status(404).json({ message: 'El correo electrónico o la contraseña son incorrectos' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Si la contraseña no coincide, devolver un mensaje de error
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña Incorrecta' });
        }
        
        // Generar un token de acceso
        const accessToken = jwt.sign({ 
            user: {
                "_id": user._id,
                "username": user.username,
                "email": user.email,
                "rol": user.rol,
            }
         }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Devolver el token de acceso
        return res.status(200).json({
            message: 'Operación exitosa',
            token: accessToken
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};