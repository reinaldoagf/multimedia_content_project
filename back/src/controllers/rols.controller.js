const Rol = require('../models/rol.model');

const populate = [];

exports._all = async (req, res) => {
    try {
        const elements = await Rol.find({ key: { $ne: 'admin' } }).populate(populate);
        return res.status(200).json({
            message: 'Lista de roles',
            data: elements
        });
    } catch (error) {
        console.error("error:", error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};