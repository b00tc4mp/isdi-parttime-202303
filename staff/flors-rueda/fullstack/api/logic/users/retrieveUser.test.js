require('dotenv').config();
const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')

describe('retrieveUser', () => {
    beforeEach(done => {
        const users = [
            {
                id: '123',
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                joined: Date.now()
            }
        ];
        const json = JSON.stringify(users, null, 4);
        writeFile('./data/users.json', json, 'utf8', error => done(error));
    });

    it('should retrieve user successfully', done => {
        const userId = '123';

        retrieveUser(userId, (error, user) => {
            expect(error).to.be.null;
            expect(user).to.deep.equal({
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                joined: user.joined
            });
            done();
        });
    });

    it('should fail when user is not found', done => {
        const userId = '456';

        retrieveUser(userId, (error, user) => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('user not found');
            expect(user).to.be.undefined;
            done();
        });
    });

    it('should fail on invalid id type', () =>
        expect(() => retrieveUser(1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty id', () =>
        expect(() => retrieveUser('  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => retrieveUser('1234', '() => { }')).to.throw(Error, 'callback is not a function')
    )

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)));
});