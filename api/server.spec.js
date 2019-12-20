const request = require('supertest');

const server = require('./server.js');

describe('the server', () => {
    describe('GET /', () => {
        it('should run the testing env', () => {

        });
        it('it should return status 200', () => {
            return request(server)
                .get('/')
                .then(res =>{
                    expect(res.status).toBe(200);
            })
        });
        it('it should return the correct object', () => {
            return request(server)
                .get('/')
                .then(res =>{
                    expect(res.type).toBe('application/json');
                    // tobe will not work 
                    // expect(res.body).toBe({message: 'hi'});
                    expect(res.body).toEqual({message: 'hi'});
            })
        });
    
    });
});


// Sam Allen 6:39 PM
// We worked on an AH problem just now and utilized the terminal command
// knex migrate:latest --env testing
// this will update the test.db3 file.  (if you only run knex migrate:latest, the test db will not be populated)