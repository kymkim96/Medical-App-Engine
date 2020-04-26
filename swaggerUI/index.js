const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const pkginfo = require('../package.json');

const info = {
    title: pkginfo.name,
    description: pkginfo.description,
    version: pkginfo.version,
    contact: pkginfo.author,
    termsOfService: ''
};
const servers = [];

// Swagger definitions
const definition = {
    openapi: '3.0.0',
    info,
    servers
};

const options = {
    definition,
    // Path to the API specs
    apis: [
        path.join(__dirname, '../spec/controllers/**/*.js')
    ]
};

const spec = swaggerJSDoc(options);

module.exports = spec;