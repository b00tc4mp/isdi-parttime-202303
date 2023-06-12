const { expect } = require('chai');
const { readFile, writeFile } = require('fs');
const retrievePost = require('./retrievePost');

describe('retrievePost', () => {
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
                author: '123',
                date: Date.now()
            }
        ];
        const usersJson = JSON.stringify(users, null, 4);
        const postsJson = JSON.stringify(posts, null, 4);
        readFile('./data/users.json', 'utf8', (error, existingUsersJson) => {
            if (error) {
                done(error);
                return;
            }
            if (existingUsersJson !== usersJson) {
                writeFile('./data/users.json', usersJson, 'utf8', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    writeFile('./data/posts.json', postsJson, 'utf8', error => done(error));
                });
            } else {
                writeFile('./data/posts.json', postsJson, 'utf8', error => done(error));
            }
        });
    });

    it('should retrieve a post when given valid user ID and post ID', done => {
        const userId = '123';
        const postId = '456';

        retrievePost(userId, postId, (error, post) => {
            expect(error).to.be.null;
            expect(post).to.deep.equal({
                id: '456',
                title: 'Test Post',
                content: 'This is a test post',
                author: '123',
                date: new Date(post.date)
            });
            done();
        });
    });

    it('should fail when given invalid user ID', done => {
        const userId = '999'; // Invalid user ID
        const postId = '456';

        retrievePost(userId, postId, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userId} not found`);
            done();
        });
    });

    it('should fail when given invalid post ID', done => {
        const userId = '123';
        const postId = '999'; // Invalid post ID

        retrievePost(userId, postId, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`post with id ${postId} not found`);
            done();
        });
    });

    it('should fail on invalid user id type', () =>
        expect(() => retrievePost(1234, 'TestId123', () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty user id', () =>
        expect(() => retrievePost('  ', 'TestId123', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid post id type', () =>
        expect(() => retrievePost('TestId123', 1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty post id', () =>
        expect(() => retrievePost('TestId123', '  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => retrievePost('TestId123', 'TestId123', '() => { }')).to.throw(Error, 'callback is not a function')
    )

    after(done => {
        readFile('./data/users.json', 'utf8', (error, existingUsersJson) => {
            if (error) {
                done(error);
                return;
            }
            if (existingUsersJson !== '[]') {
                writeFile('./data/users.json', '[]', 'utf8', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    writeFile('./data/posts.json', '[]', 'utf8', error => done(error));
                });
            } else {
                writeFile('./data/posts.json', '[]', 'utf8', error => done(error));
            }
        });
    });
});
