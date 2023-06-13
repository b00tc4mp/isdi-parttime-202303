const { expect } = require('chai');
const { readFile, writeFile } = require('fs');
const updateMail = require('./updateMail');

describe('updateMail', () => {
    beforeEach(done => {
        const users = [
            {
                id: '123',
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                password: 'TestPassword',
                joined: Date.now(),
                favs: []
            }
        ];
        const json = JSON.stringify(users, null, 4);
        writeFile('./data/users.json', json, 'utf8', error => done(error));
    });

    it('should update the mail successfully', done => {
        const newMail = 'newmail@example.com';
        const userId = '123';

        updateMail(newMail, userId, error => {
            expect(error).to.be.null;

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null;

                const users = JSON.parse(json);
                const user = users.find(user => user.id === userId);

                expect(user.mail).to.equal(newMail);
                done();
            });
        });
    });

    it('should fail if user is not found', done => {
        const newMail = 'newmail@example.com';
        const userId = '456';

        updateMail(newMail, userId, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('user not found');

            done();
        });
    });

    it('should fail on invalid mail format', () =>
        expect(() => updateMail('notamail', '1234', () => { })).to.throw(Error, 'mail format is not valid')
    )

    it('should fail on empty mail', () =>
        expect(() => updateMail('  ', '1234', () => { })).to.throw(Error, 'mail is empty')
    )

    it('should fail on invalid mail type', () =>
        expect(() => updateMail(1234, '1234', () => { })).to.throw(Error, 'mail is not an string')
    )

    it('should fail on invalid id type', () =>
        expect(() => updateMail('mail@example.com', 1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty id', () =>
        expect(() => updateMail('mail@example.com', ' ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => updateMail('mail@example.com', '1234', '() => { }')).to.throw(Error, 'callback is not a function')
    )

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)));
});
