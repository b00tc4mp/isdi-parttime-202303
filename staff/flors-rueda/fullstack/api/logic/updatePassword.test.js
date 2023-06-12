const { expect } = require('chai');
const { readFile, writeFile } = require('fs');
const updatePassword = require('./updatePassword');

describe('updatePassword', () => {
    beforeEach(done => {
        const users = [
            {
                id: '123',
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                password: 'OldPassword123',
                joined: Date.now(),
                favs: []
            }
        ];
        const json = JSON.stringify(users, null, 4);
        writeFile('./data/users.json', json, 'utf8', error => {
            if (error) {
                done(error);
                return;
            }
            done();
        });
    });

    afterEach(done => {
        writeFile('./data/users.json', '[]', 'utf8', error => {
            if (error) {
                done(error);
                return;
            }
            done();
        });
    });

    it('should succeed on correct userId, old password, and valid new password', done => {
        const userId = '123';
        const oldPassword = 'OldPassword123';
        const newPassword = 'NewPassword123';
        const repeatPassword = 'NewPassword123';

        updatePassword(userId, oldPassword, newPassword, repeatPassword, error => {
            expect(error).to.be.null;

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null;

                const users = JSON.parse(json);
                const user = users.find(user => user.id === userId);

                expect(user).to.exist;
                expect(user.password).to.equal(newPassword);

                done();
            });
        });
    });

    it('should fail on non-existing userId', done => {
        const userId = '456';
        const oldPassword = 'OldPassword123';
        const newPassword = 'NewPassword123';
        const repeatPassword = 'NewPassword123';

        updatePassword(userId, oldPassword, newPassword, repeatPassword, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('user not found');

            done();
        });
    });

    it('should fail on invalid id type', () =>
        expect(() => updatePassword(1234, 'oldPassword123', 'newPassword123', 'newPassword123', () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty id', () =>
        expect(() => updatePassword('  ', 'oldPassword123', 'newPassword123', 'newPassword123', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid old password type', () =>
        expect(() => updatePassword('1234', 1234, 'newPassword123', 'newPassword123', () => { })).to.throw(Error, 'password is not a string')
    )

    it('should fail on empty old password', () =>
        expect(() => updatePassword('1234', ' ', 'newPassword123', 'newPassword123', () => { })).to.throw(Error, 'password is empty')
    )

    it('should fail on invalid new password type', () =>
        expect(() => updatePassword('1234', 'oldPassword123', 1234, 'newPassword123', () => { })).to.throw(Error, 'password is not a string')
    )

    it('should fail on empty new password', () =>
        expect(() => updatePassword('1234', 'oldPassword123', ' ', 'newPassword123', () => { })).to.throw(Error, 'password is empty')
    )

    it('should fail on invalid repeat password type', () =>
        expect(() => updatePassword('1234', 'oldPassword123', 'newPassword123', 1234, () => { })).to.throw(Error, 'password is not a string')
    )

    it('should fail on empty repeat password', () =>
        expect(() => updatePassword('1234', 'oldPassword123', 'newPassword123', '  ', () => { })).to.throw(Error, 'password is empty')
    )

    it('should fail on different password and repeat password', () =>
        expect(() => updatePassword('1234', 'oldPassword123', 'newPassword123', 'notSame1', () => { })).to.throw(Error, 'password and confirmation password are different')
    )

    it('should fail on new password equals old password', () =>
        expect(() => updatePassword('1234', 'oldPassword123', 'oldPassword123', 'oldPassword123', () => { })).to.throw(Error, 'new password equals old password'))

    it('should fail on invalid callback', () =>
        expect(() => updatePassword('1234', 'oldPassword123', 'newPassword123', 'newPassword123', '() => { }')).to.throw(Error, 'callback is not a function')
    )

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)));
});
