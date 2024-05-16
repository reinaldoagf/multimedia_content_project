const path = require('path');
const Content = require('../models/content.model');

const populate = [{
    path: 'theme',
    populate:[
        {path: 'category'},
        {path: 'type'}
    ]
}, {
    path: 'user'
}];

exports._all = async (req, res) => {
    try {
        const elements = await Content.find({}).populate(populate);
        return res.status(200).json({
            message: 'Lista de contenido',
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
            file_url: req.file?.filename ? process.env.URL_API + 'uploads/' + req.file.filename : null,
            file_path: req.file?.filename ? path.join(path.resolve('uploads'), req.file.filename) : null,
        }

        return res.status(200).json({
            message: 'Contenido registrado',
            data: await Content.create(data)
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};