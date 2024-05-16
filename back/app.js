require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const connectDB = require('./database');
const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth.routes');
const usersRouter = require('./src/routes/users.routes');
const contentCategoriesRouter = require('./src/routes/content-categories.routes');
const themesRouter = require('./src/routes/themes.routes');
const rolsRouter = require('./src/routes/rols.routes');
const contentRouter = require('./src/routes/content.routes');
const themeTypesRouter = require('./src/routes/theme-types.routes');

const app = express();

// Manejador de errores para las validaciones
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'El formato de la solicitud es inválido'
        });
    }
    next();
});

// Conectar a la base de datos
connectDB();

app.use(cors()); // Configurar CORS
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/content-categories', contentCategoriesRouter);
app.use('/api/v1/themes', themesRouter);
app.use('/api/v1/rols', rolsRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/theme-types', themeTypesRouter);

module.exports = app;