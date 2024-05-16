const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
    Schema
} = mongoose;

// Definir el esquema del usuario
const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    rol: {
        default: null,
        type: Schema.Types.ObjectId,
        ref: 'Rol'
    },
}, {
    versionKey: false,
    timestamps: true,
});

schema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
});

schema.pre('findOneAndUpdate', async function(next) {
    if (!this._update.password) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this._update.password, salt);
    this._update.password = hash;

    next();
});

schema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Crear el modelo "User" a partir del esquema definido
// Exportar el modelo para poder utilizarlo en otras partes de la aplicación
module.exports = mongoose.model('User', schema);