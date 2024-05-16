const {
  check,
  validationResult
} = require('express-validator');

const fs = require('fs');

const checkUniqueValue = (fieldName, Model) => {
  return check(fieldName)
      .custom(async value => {
          const query = {};
          query[fieldName] = value; // Usar corchetes para asignar el nombre del campo dinámicamente
          const elemento = await Model.findOne(query);
          if (elemento) {
              throw new Error(`El ${fieldName} '${value}' ya ha sido registrado`);
          }
      });
};

const checkValidations = async (req, res, next) => {
  // Ejecutar las validaciones
  const errors = validationResult(req);
  // Si hay errores de validación
  if (!errors.isEmpty()) {
      // Eliminar el archivo subido
      if (req.file) {
          fs.unlinkSync(req.file.path);
          console.log(`El archivo '${req.file.filename}' ha sido eliminado debido a errores de validación.`);
      }
      // Retornar los errores de validación
      return res.status(400).json({
          errors: errors.array()
      });
  }
  // Si no hay errores, continuar con la solicitud
  next();
};

module.exports = {
  checkUniqueValue,
  checkValidations
};