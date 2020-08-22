const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig');

describe('jokes routes', () => {
    it('should use testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('/GET /api/jokes/', () => {
        it('should return status 401 without being logged in', async() => {
            const res = await request(server).get('/api/jokes')
            
            expect(res.status).toBe(401);
        });
        it('not logged in message should be ', async() => {
            const res = await request(server).get('/api/jokes')
            
            expect(res.body.message).toBe('You shall not pass');
        });

    });
});