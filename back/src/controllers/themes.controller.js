const Theme = require('../models/theme.model');

const populate = [{
    path: 'category'
},{
    path: 'type'
}];

exports._all = async (req, res) => {
    try {
        const elements = await Theme.find({}).populate(populate);
        return res.status(200).json({
            message: 'Lista de temáticas',
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
            ...req.body
        }

        return res.status(200).json({
            message: 'Temática registrada',
            data: await Theme.create(data)
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};

exports._update = async (req, res) => {
    try {
        const element = await Theme.findById(req.params.id)
        if (!element) {
            return res.status(404).json({ error: 'No se encontró la categoría' });
        }

        const data = {
            ...req.body
        }


        return res.status(200).json({
            message: 'Categoría actualizada correctamente',
            data: await Theme.findByIdAndUpdate(element._id, data, { new: true })
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};

exports._delete = async (req, res) => {
    try {
        const element = await Theme.findById(req.params.id)

        return res.status(200).json({
            message: 'Temática eliminada',
            data: await Theme.findByIdAndDelete(element._id)
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};
