const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: process.env.PORT || 3000
});

server.route({
    method: ['POST'],
    path: '/api/v1/add',
    handler: (request, reply) => {
        reply({
            result: (parseFloat(request.payload.number1) + parseFloat(request.payload.number2))
        }).code(200);
    },
    config: {
        description: 'Adds 2 numbers',
        notes: 'Returns a the sum of 2 numbers',
        tags: ['api'],
        validate: {
            payload: {
                number1: Joi.number().required(),
                number2: Joi.number().required()
            },
            failAction: (request, reply, source, error) => {
                error.output.error_details = error.data.details;
                reply(error.output.payload).code(error.output.statusCode);
            }
        }
    }
});

module.exports = server;
