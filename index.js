const server = require('./src/server');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const options = {
    info: {
        'title': 'API Documentation',
        'version': Pack.version,
    }
};

server.register([
    Inert,
    Vision,
    { 'register': HapiSwagger, 'options': options }
], () => {
    server.start( (err) => {
        if (err) {
            console.log(err);
        } else {
            console.info(`Server started at ${ server.info.uri }`);
        }
    });
});
