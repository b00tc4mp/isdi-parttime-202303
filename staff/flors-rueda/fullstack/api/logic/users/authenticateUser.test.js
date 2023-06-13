require('dotenv').config();
const { expect } = require('chai');
const { writeFile, rea } = require('fs');
const authenticateUser = require('./authenticateUser');

describe('authenticateUser', () => {
    beforeEach(done => {
        const users = [
            {
                id: '123',
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                password: 'TestPassword123',
                joined: Date.now(),
                favs: []
            }
        ];
        const json = JSON.stringify(users, null, 4);
        writeFile('./data/users.json', json, 'utf8', error => done(error));
    });

    it('should succeed on correct username and password', done => {
        const username = 'testuser';
        const password = 'TestPassword123';

        authenticateUser(username, password, (error, userId) => {
            expect(error).to.be.null;
            expect(userId).to.equal('123');
            done();
        });
    });

    it('should fail on non-existing username', done => {
        const username = 'nonexistent';
        const password = 'TestPassword';

        authenticateUser(username, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with username ${username} not found`);
            expect(userId).to.be.undefined;
            done();
        });
    });

    it('should fail on incorrect password', done => {
        const username = 'testuser';
        const password = 'WrongPassword';

        authenticateUser(username, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('wrong credentials');
            expect(userId).to.be.undefined;
            done();
        });
    });

    it('should fail on invalid username type', () =>
        expect(() => authenticateUser(654, 'TestPassword123', () => { })).to.throw(Error, 'username is not a string')
    )

    it('should fail on empty username', () =>
        expect(() => authenticateUser('', 'TestPassword123', () => { })).to.throw(Error, 'username is empty')
    )

    it('should fail on invalid password type', () =>
        expect(() => authenticateUser('testuser', 13424, () => { })).to.throw(Error, 'password is not a string')
    )

    it('should fail on invalid empty password', () =>
        expect(() => authenticateUser('testuser', '  ', () => { })).to.throw(Error, 'password is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => authenticateUser('testuser', 'TestPassword123', '() => { }')).to.throw(Error, 'callback is not a function')
    )

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})
