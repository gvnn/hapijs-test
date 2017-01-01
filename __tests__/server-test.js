const Server = require('../src/server.js');

test('adds 1 + 2 to equal 3', () => {
    return new Promise((resolve, reject) => {
        Server.inject({
            method: 'POST',
            url: '/api/v1/add',
            payload: {
                'number1': 1,
                'number2': 2
            }
        }, (response) => {
            try {
                expect(response.statusCode).toEqual(200);
                expect(response.result.result).toEqual(3);
                resolve(response);
            } catch(e) {
                reject(e);
            }
        });
    });
});

test('missing params', () => {
    return new Promise((resolve, reject) => {
        Server.inject({
            method: 'POST',
            url: '/api/v1/add',
            payload: {
                'number': 2,
                'test': 2
            }
        }, (response) => {
            try {
                expect(response.statusCode).toEqual(400);
                resolve(response);
            } catch(e) {
                reject(e);
            }
        });
    });
});

test('not numeric params', () => {
    return new Promise((resolve, reject) => {
        Server.inject({
            method: 'POST',
            url: '/api/v1/add',
            payload: {
                'number1': 'a',
                'number2': 'asdasd'
            }
        }, (response) => {
            try {
                expect(response.statusCode).toEqual(400);
                resolve(response);
            } catch(e) {
                reject(e);
            }
        });
    });
});
