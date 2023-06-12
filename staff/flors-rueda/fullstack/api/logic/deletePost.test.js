const { expect } = require('chai');
const { writeFile, readFile } = require('fs');
const deletePost = require('./deletePost');

describe('deletePost', () => {
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

    it('should delete a post when given valid user ID and post ID', done => {
        const userId = '123';
        const postId = '456';

        deletePost(userId, postId, error => {
            expect(error).to.be.null;

            readFile('./data/posts.json', 'utf8', (error, json) => {
                if (error) {
                    done(error);
                    return;
                }

                const posts = JSON.parse(json);
                const deletedPost = posts.find(post => post.id === postId);
                expect(deletedPost).to.be.undefined;

                done();
            });
        });
    });

    it('should fail when given invalid user id', done => {
        const userId = '999';
        const postId = '456';

        deletePost(userId, postId, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('authentication failed');
            done();
        });
    });

    it('should fail when given invalid post id', done => {
        const userId = '123';
        const postId = '999';

        deletePost(userId, postId, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('post authentication failed');
            done();
        });
    });

    it('should fail on invalid user id type', () =>
        expect(() => deletePost(1234, 'TestId123', () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty user id', () =>
        expect(() => deletePost('  ', 'TestId123', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid post id type', () =>
        expect(() => deletePost('TestId123', 1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty post id', () =>
        expect(() => deletePost('TestId123', '  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => deletePost('TestId123', 'TestId123', '() => { }')).to.throw(Error, 'callback is not a function')
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
