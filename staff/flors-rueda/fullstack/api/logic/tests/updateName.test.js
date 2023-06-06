const { expect } = require('chai');
const { readFile, writeFile } = require('fs');
const updateName = require('../updateName');

describe('updateName', () => {
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

    it('should update the name successfully', done => {
        const newName = 'newName';
        const userId = '123';

        updateName(newName, userId, error => {
            expect(error).to.be.null;

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null;

                const users = JSON.parse(json);
                const user = users.find(user => user.id === userId);

                expect(user.name).to.equal(newName);
                done();
            });
        });
    });

    it('should fail if user is not found', done => {
        const newName = 'newName';
        const userId = '345';

        updateName(newName, userId, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('user not found');

            done();
        });
    });

    it('should fail on empty name', () =>
        expect(() => updateName('  ', '1234', () => { })).to.throw(Error, 'name is empty')
    )

    it('should fail on invalid name type', () =>
        expect(() => updateName(1234, '1234', () => { })).to.throw(Error, 'name is not a string')
    )

    it('should fail on invalid id type', () =>
        expect(() => updateName('name.com', 1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty id', () =>
        expect(() => updateName('name', ' ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => updateName('mail@example.com', '1234', '() => { }')).to.throw(Error, 'callbak is not a function')
    )

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)));
});
