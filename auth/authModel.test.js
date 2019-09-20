const db = require('../database/dbConfig.js');
const userDb = require('./authModel');
const bcrypt = require('bcryptjs')

describe('authModel.js helper functions', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })
    // describe('create new users one time', () => {
    //    it('should create two users', async () => {
    //        let user = {username: 'mason', password: 'mason'}
    //        let hash = bcrypt.hashSync(user.password, 14)
    //        user.password = hash 
    //        userDb.add(user) 
    //        let user2 = {username: 'alice', password: 'alice'}
    //        let hash2 = bcrypt.hashSync(user2.password, 14)
    //        user2.password = hash2 
    //        console.log(user2)
    //        console.log(user)
    //    }) 
    // })

    describe('findBy helper function', () => {
        it('should return an object when provided the username', async () => {
            let user = await userDb.add({username: 'masonkarse', password: 'mk'})
            let mason = await userDb.findBy({username: 'masonkarse'})
            expect(mason[0].id).toEqual(1)
        })
    }) 
})