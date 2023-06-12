const { expect } = require('chai');
const { readFile, writeFile } = require('fs');
const retrieveFavoritePosts = require('./retrieveFavoritePosts');

describe('retrieveFavoritePosts', () => {
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
                favs: ['456']
            },
            {
                id: '789',
                username: '@testauthor',
                name: 'Test Author',
                mail: 'testauthor@mail.com',
                avatar: null,
                password: 'TestAuthor123',
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
                isPublic: true
            },
            {
                id: '789',
                title: 'Another Post',
                content: 'This is another post',
                author: '123',
                createdAt: Date.now(),
                isPublic: true
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

    it('should retrieve favorite posts for a valid user ID', done => {
        const userId = '123';

        retrieveFavoritePosts(userId, (error, posts) => {
            expect(error).to.be.null;
            expect(posts).to.be.an('array');
            expect(posts.length).to.equal(1);

            const firstPost = posts[0];
            expect(firstPost).to.have.property('id', '456');
            expect(firstPost).to.have.property('title', 'Test Post');
            expect(firstPost).to.have.property('content', 'This is a test post');
            expect(firstPost).to.have.property('author').that.deep.equals({
                id: '789',
                name: 'Test Author',
                username: '@testauthor',
                avatar: null
            });
            expect(firstPost).to.have.property('isFav', true);

            done();
        });
    });

    it('should return an error for an invalid user ID', done => {
        const userId = '999'; // Invalid user ID

        retrieveFavoritePosts(userId, (error, posts) => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userId} not found`);
            expect(posts).to.be.undefined;

            done();
        });
    });

    it('should fail on invalid id type', () =>
        expect(() => retrieveFavoritePosts(1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty id', () =>
        expect(() => retrieveFavoritePosts('  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => retrieveFavoritePosts('1234', '() => { }')).to.throw(Error, 'callback is not a function')
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
