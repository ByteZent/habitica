const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Habitica API',
      version: '4.0.0',
      description: 'API Documentation for the Habitica Project',
    },
    basePath: '/api/',
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://habitica.com/',
        description: 'LIVE',
      },
    ],
  },
  apis: [`${__dirname}/**/*.js`], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
