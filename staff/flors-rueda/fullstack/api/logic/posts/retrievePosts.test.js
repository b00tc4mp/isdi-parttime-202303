require('dotenv').config();
const { expect } = require('chai');
const { writeFile } = require('fs');
const retrievePosts = require('./retrievePosts');

describe('retrievePosts', () => {
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
            }
        ];
        const posts = [
            {
                id: '456',
                title: 'Test Post',
                content: 'This is a test post',
                author: '123',
                date: Date.now(),
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

    it('should retrieve and filter posts for a valid user ID', done => {
        const userAuth = '123';

        retrievePosts(userAuth, (error, posts) => {
            expect(error).to.be.null;
            expect(posts).to.be.an('array');
            expect(posts).to.have.lengthOf(1);

            const post = posts[0];
            expect(post).to.have.property('id', '456');
            expect(post).to.have.property('title', 'Test Post');
            expect(post).to.have.property('content', 'This is a test post');
            expect(post).to.have.property('isPublic', true);
            expect(post).to.have.property('isFav', true);
            expect(post).to.have.property('author');
            expect(post.author).to.deep.equal({
                id: '123',
                name: 'Test User',
                username: '@testuser',
                avatar: null
            });

            done();
        });
    });


    it('should return an error when given an invalid user id', done => {
        const userAuth = '999';

        retrievePosts(userAuth, (error, posts) => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userAuth} not found`);
            expect(posts).to.be.undefined;
            done();
        });
    });

    it('should fail on invalid id type', () =>
        expect(() => retrievePosts(1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty id', () =>
        expect(() => retrievePosts('  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => retrievePosts('1234', '() => { }')).to.throw(Error, 'callback is not a function')
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
