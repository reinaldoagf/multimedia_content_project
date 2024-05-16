const path = require('path');
const fs = require('fs');
const ContentCategory = require('../models/content-category.model');

const populate = [];

exports._all = async (req, res) => {
    try {
        const elements = await ContentCategory.find({}).populate(populate);
        return res.status(200).json({
            message: 'Lista de categorias',
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
            image_url: req.file?.filename ? process.env.URL_API + 'uploads/' + req.file.filename : null,
            image_path: req.file?.filename ? path.join(path.resolve('uploads'), req.file.filename) : null,
        }

        return res.status(200).json({
            message: 'Categoria registrada',
            data: await ContentCategory.create(data)
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};

exports._update = async (req, res) => {
    try {
        const element = await ContentCategory.findById(req.params.id)
        if (!element) {
            return res.status(404).json({ error: 'No se encontró la categoría' });
        }

        if(req.file?.filename && element?.image_path) {
            fs.unlinkSync(element.image_path);
            fs.unlinkSync((element.image_path).replace('compressed_',''));
        }

        const data = {
            ...req.body,            
            image_url: req.file?.filename ? process.env.URL_API + 'uploads/' + req.file.filename : element.image_url,
            image_path: req.file?.filename ? path.join(path.resolve('uploads'), req.file.filename) : element.image_path,
        }


        return res.status(200).json({
            message: 'Categoría actualizada correctamente',
            data: await ContentCategory.findByIdAndUpdate(element._id, data, { new: true })
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};

exports._delete = async (req, res) => {
    try {
        const element = await ContentCategory.findById(req.params.id)
        if(element?.image_path) {
            fs.unlinkSync(element.image_path);
            fs.unlinkSync((element.image_path).replace('compressed_',''));
        }

        return res.status(200).json({
            message: 'Categoria eliminada',
            data: await ContentCategory.findByIdAndDelete(element._id)
        });
    } catch (error) {
        // Si el error no es del tipo ValidationError o no contiene un error específico para el campo 'name', imprime el error completo
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor' }); // Retorna error 500 para indicar un problema interno del servidor
    }
};
