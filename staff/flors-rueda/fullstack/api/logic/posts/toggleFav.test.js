const { expect } = require('chai');
const { writeFile, readFile } = require('fs');
const toggleFav = require('./toggleFav');

describe('toggleFav', () => {
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
        const posts = [
            {
                id: '456',
                title: 'Test Post',
                content: 'This is a test post',
                author: '789',
                createdAt: Date.now()
            }
        ];
        const usersJson = JSON.stringify(users, null, 4);
        const postsJson = JSON.stringify(posts, null, 4);
        writeFile('./data/users.json', usersJson, 'utf8', error => {
            if (error) {
                done(error);
                return;
            }
            writeFile('./data/posts.json', postsJson, 'utf8', error => done(error));
        });
    });

    it('should add the post ID to the user\'s favorites when it is not already favorited', done => {
        const postId = '456';
        const userAuth = '123';

        toggleFav(postId, userAuth, error => {
            expect(error).to.be.null;

            readFile('./data/users.json', 'utf8', (error, json) => {
                if (error) {
                    done(error);
                    return;
                }

                const users = JSON.parse(json);
                const user = users.find(user => user.id === userAuth);
                expect(user.favs).to.include(postId);

                done();
            });
        });
    });

    it('should remove the post ID from the user\'s favorites when it is already favorited', done => {
        const postId = '456';
        const userAuth = '123';

        const users = [
            {
                id: '123',
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                password: 'TestPassword123',
                joined: Date.now(),
                favs: [postId]
            }
        ];
        const usersJson = JSON.stringify(users, null, 4);
        writeFile('./data/users.json', usersJson, 'utf8', error => {
            if (error) {
                done(error);
                return;
            }

            toggleFav(postId, userAuth, error => {
                expect(error).to.be.null;

                readFile('./data/users.json', 'utf8', (error, json) => {
                    if (error) {
                        done(error);
                        return;
                    }

                    const users = JSON.parse(json);
                    const user = users.find(user => user.id === userAuth);
                    expect(user.favs).to.not.include(postId);

                    done();
                });
            });
        });
    });

    it('should fail when given an invalid post ID', done => {
        const postId = '999';
        const userAuth = '123';

        toggleFav(postId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`post with id ${postId} not found`);
            done();
        });
    });

    it('should fail when given an invalid user ID', done => {
        const postId = '456';
        const userAuth = '999';

        toggleFav(postId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userAuth} not found`);
            done();
        });
    });

    it('should fail on invalid post id type', () =>
        expect(() => toggleFav(1234, 'TestId123', () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty post id', () =>
        expect(() => toggleFav('  ', 'TestId123', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid user id type', () =>
        expect(() => toggleFav('TestId123', 1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty user id', () =>
        expect(() => toggleFav('TestId123', '  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => toggleFav('TestId123', 'TestId123', '() => { }')).to.throw(Error, 'callback is not a function')
    )

    after(done => {
        writeFile('./data/users.json', '[]', 'utf8', error => {
            if (error) {
                done(error);
                return;
            }
            writeFile('./data/posts.json', '[]', 'utf8', error => done(error));
        });
    });
});
