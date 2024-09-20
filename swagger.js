import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Paye ton kawa',
    description: 'Description de mon API',
  },
  host: 'localhost:3004',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/configurations/express.js']; // Chemin vers votre fichier principal Express

swaggerAutogen(outputFile, endpointsFiles, doc);