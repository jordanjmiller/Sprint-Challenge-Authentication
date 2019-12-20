  
const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig');

describe('auth routes', () => {
    it('should use testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('/POST /api/auth/register', () => {
        beforeAll(async () => {
            await db('users').truncate();
        });

        it('should return status 201', async() => {
            const res = await request(server).post('/api/auth/register')
            .send({username: "jmiller", password: "pass"});
            expect(res.status).toBe(200);
        })

        it('should add user', async() => {
            const users = await db('users');
            
            expect(users.length).toBe(1);
        })
    });

    describe('/POST /api/auth/login', () => {
        it('should return status 200', async() => {
            const res = await request(server).post('/api/auth/login')
            .send({username: "jmiller", password: "pass"});
            expect(res.status).toBe(200);
        });

        it('should a message', async() => {
            const res = await request(server).post('/api/auth/login')
            .send({username: "jmiller", password: "pass"});

            expect(res.body).toBeDefined();
            expect(res.body.message).toBe(`Welcome jmiller!`);
            
        });
        it('message should be hello user', async() => {
            const res = await request(server).post('/api/auth/login')
            .send({username: "jmiller", password: "pass"});

            expect(res.body.message).toBe(`Welcome jmiller!`);            
        });
    });
});