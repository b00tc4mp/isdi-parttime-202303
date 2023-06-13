const { expect } = require('chai');
const { writeFile, readFile } = require('fs');
const toggleLike = require('./toggleLike');

describe('toggleLike', () => {
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
                createdAt: Date.now(),
                likes: []
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

    it('should add the user ID to the post\'s likes when it is not already liked', done => {
        const postId = '456';
        const userAuth = '123';

        toggleLike(postId, userAuth, error => {
            expect(error).to.be.null;

            readFile('./data/posts.json', 'utf8', (error, json) => {
                if (error) {
                    done(error);
                    return;
                }

                const posts = JSON.parse(json);
                const post = posts.find(post => post.id === postId);
                expect(post.likes).to.include(userAuth);

                done();
            });
        });
    });

    it('should remove the user ID from the post\'s likes when it is already liked', done => {
        const postId = '456';
        const userAuth = '123';

        const posts = [
            {
                id: '456',
                title: 'Test Post',
                content: 'This is a test post',
                author: '789',
                createdAt: Date.now(),
                likes: [userAuth]
            }
        ];
        const postsJson = JSON.stringify(posts, null, 4);
        writeFile('./data/posts.json', postsJson, 'utf8', error => {
            if (error) {
                done(error);
                return;
            }

            toggleLike(postId, userAuth, error => {
                expect(error).to.be.null;

                readFile('./data/posts.json', 'utf8', (error, json) => {
                    if (error) {
                        done(error);
                        return;
                    }

                    const posts = JSON.parse(json);
                    const post = posts.find(post => post.id === postId);
                    expect(post.likes).to.not.include(userAuth);

                    done();
                });
            });
        });
    });

    it('should fail when given an invalid post ID', done => {
        const postId = '999';
        const userAuth = '123';

        toggleLike(postId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`post with id ${postId} not found`);
            done();
        });
    });

    it('should fail when given an invalid user ID', done => {
        const postId = '456';
        const userAuth = '999';

        toggleLike(postId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userAuth} not found`);
            done();
        });
    });

    it('should fail on invalid post id type', () =>
        expect(() => toggleLike(1234, 'TestId123', () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty post id', () =>
        expect(() => toggleLike('  ', 'TestId123', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid user id type', () =>
        expect(() => toggleLike('TestId123', 1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty user id', () =>
        expect(() => toggleLike('TestId123', '  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => toggleLike('TestId123', 'TestId123', '() => { }')).to.throw(Error, 'callback is not a function')
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
