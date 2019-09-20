const request = require('supertest');
const db = require('../database/dbConfig.js');

const server = require('./server.js');

describe('auth-route.js', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe("POST /api/auth/register", () => {
        it('should return a 201 ok status code when given a unique username', () => {
            return request(server)
                .post('/api/auth/register')
                .send({username: 'flea', password: 'flea'})
                .expect(201)
        })


        it('should return the id of the newly created user with a message', () => {
            return request(server)
                .post('/api/auth/register') 
                .send({username: 'brian', password: 'miller'})
                .then(res => {
                    expect(res.body).toBe('record with id 1 has been added to the database')
                })
        })
    })


    describe("GET /api/jokes", () => {
        it('should return a 401 when not given credentials', () => {
            return request(server)
                .get('/api/jokes')
                .expect(401)
        })
        it('should return return the object {you: shall not pass} when login in without token', () => {
            return request(server) 
                .get('/api/jokes') 
                .then(res => {
                    expect(res.body).toEqual({you: 'shall not pass!'})
                })
        })
    })
})


describe("POST /api/auth/login", () => {

    afterAll(async () => {
        await db('users').truncate();
    });

    describe('testing login endpoint', () => {
        it("should add a new user to the table", () => {
            return request(server)
            .post('/api/auth/register') 
            .send({username: 'me', password: 'beast'})
            .expect(201)
        })
        it('should return a 400 status when given an incorrect password', () => {
            return request(server)
                .post('/api/auth/login')
                .send({username: 'me', password: 'flea'})
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

    })
})

