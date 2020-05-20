const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
require('dotenv').config();
const { sequelize } = require('./models');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const spec = require('../swaggerUI');

const router = require('./router');

const app = express();
sequelize.sync();
// passportConfig(passport);

app.set('port', process.env.PORT || 8010);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(spec));

// app.use('/file', express.static(path.join(__dirname, 'uploads')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', router);

// app.use((req, res, next) => {
//     const err = new Error('not found');
//     err.status = 404;
//     next(err);
// });
//
// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500).send({ message: 'error' });
// });

app.listen(app.get('port'), () => {
    console.log(`connect to http://localhost:${app.get('port')}`);
});
