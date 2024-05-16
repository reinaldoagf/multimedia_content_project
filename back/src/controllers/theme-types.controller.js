const ThemeType = require('../models/theme-type.model');

const populate = [];

exports._all = async (req, res) => {
    try {
        const elements = await ThemeType.find({}).populate(populate);
        return res.status(200).json({
            message: 'Lista de tipos de temática',
            data: elements
        });
    } catch (error) {
        console.error("error:", error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};