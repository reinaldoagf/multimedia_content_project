const User = require('../models/user.model');

const populate = [{
    path: 'rol',
    select: '-_id -__v' // Opcional: excluye los campos _id y __v de los documentos de rol
}];

exports._all = async (req, res) => {
    try {
        const elements = await User.find({}).select('-password').populate(populate);
        return res.status(200).json({
            message: 'Lista de usuarios',
            data: elements
        });
    } catch (error) {
        console.error("error:", error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};


exports._create = async (req, res) => {
    try {
        const data = {
            ...req.body,
        }

        return res.status(200).json({
            message: 'Usuario registrado',
            data: await User.create(data)
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};