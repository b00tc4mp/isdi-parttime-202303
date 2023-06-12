const { expect } = require('chai');
const { readFile, writeFile } = require('fs');
const deleteUser = require('./deleteUser');

describe('deleteUser', () => {
    //TODO chek if i should mock posts too
    beforeEach(done => {
        const users = [
            {
                id: '123',
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                password: 'Password123',
                joined: Date.now(),
                favs: []
            }
        ];
        const json = JSON.stringify(users, null, 4);
        writeFile('./data/users.json', json, 'utf8', error => done(error));
    });

    it('should succeed on delete user and update posts', done => {
        const userId = '123';
        const password = 'UserPassword';

        const users = [
            { id: userId, password, username: 'user1' },
            { id: '456', password: 'Password456', username: 'user2' }
        ];

        const posts = [
            { id: 'post1', author: userId, likes: [userId, '789'] },
            { id: 'post2', author: '456', likes: ['789', userId] },
            { id: 'post3', author: '789', likes: ['111', '222'] }
        ];

        writeFile('./data/users.json', JSON.stringify(users), 'utf8', error => {
            expect(error).to.be.null;

            writeFile('./data/posts.json', JSON.stringify(posts), 'utf8', error => {
                expect(error).to.be.null;

                deleteUser(userId, password, error => {
                    expect(error).to.be.null;

                    readFile('./data/users.json', 'utf8', (error, json) => {
                        expect(error).to.be.null;
                        const remainingUsers = JSON.parse(json);
                        expect(remainingUsers).to.have.lengthOf(1);
                        expect(remainingUsers[0].id).to.equal('456');

                        readFile('./data/posts.json', 'utf8', (error, json) => {
                            expect(error).to.be.null;
                            const remainingPosts = JSON.parse(json);

                            expect(remainingPosts[0].likes).to.not.include(userId);
                            expect(remainingPosts[1].likes).to.not.include(userId);

                            expect(remainingPosts).to.have.lengthOf(2);
                            expect(remainingPosts[0].author).to.not.equal(userId);

                            done();
                        });
                    });
                });
            });
        });
    });


    it('should fail on non-existing userId', done => {
        const userId = '456';
        const password = 'Password123';

        deleteUser(userId, password, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('authentication failed');

            done();
        });
    });

    it('should fail on incorrect password', done => {
        const userId = '123';
        const password = 'WrongPassword';

        deleteUser(userId, password, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('authentication failed');

            done();
        });
    });

    it('should fail on invalid id type', () =>
        expect(() => deleteUser(1234, 'TestPassword123', () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty id', () =>
        expect(() => deleteUser('  ', 'TestPassword123', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid password type', () =>
        expect(() => deleteUser('123', 13424, () => { })).to.throw(Error, 'password is not a string')
    )

    it('should fail on invalid empty password', () =>
        expect(() => deleteUser('123', '  ', () => { })).to.throw(Error, 'password is empty')
    )



    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)));
    after(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)));
});
