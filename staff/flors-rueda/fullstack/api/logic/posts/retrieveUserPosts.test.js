require('dotenv').config();
const { expect } = require('chai');
const { writeFile } = require('fs');
const retrieveUserPosts = require('./retrieveUserPosts');

describe('retrieveUserPosts', () => {
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
                isPublic: true,
                date: Date.now()
            },
            {
                id: '789',
                title: 'Private Post',
                content: 'This is a private post',
                author: '999',
                isPublic: false,
                date: Date.now()
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

    it('should retrieve user posts when given a valid user ID and user authentication', done => {
        const userId = '123';
        const userAuth = '123';

        retrieveUserPosts(userId, userAuth, (error, posts) => {
            expect(error).to.be.null;

            expect(posts).to.be.an('array');
            expect(posts).to.have.lengthOf(1);

            const retrievedPost = posts[0];
            expect(retrievedPost).to.have.property('id', '456');
            expect(retrievedPost).to.have.property('title', 'Test Post');
            expect(retrievedPost).to.have.property('content', 'This is a test post');
            expect(retrievedPost).to.have.property('author', '123');
            expect(retrievedPost).to.have.property('isPublic', true);
            expect(retrievedPost).to.have.property('isFav', true);

            done();
        });
    });

    it('should return an error when given an invalid user ID', done => {
        const userId = '999';
        const userAuth = '123';

        retrieveUserPosts(userId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userId} not found`);
            done();
        });
    });

    it('should return an error when given an invalid user authentication', done => {
        const userId = '123';
        const userAuth = '999';

        retrieveUserPosts(userId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userAuth} not found`);
            done();
        });
    });

    it('should fail on invalid user id type', () =>
        expect(() => retrieveUserPosts(1234, '1243214', () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty user id', () =>
        expect(() => retrieveUserPosts('  ', '1243214', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid user authentication type', () =>
        expect(() => retrieveUserPosts('1243214', 1234, () => { })).to.throw(Error, 'id is not a string')
    )

    it('should fail on empty user authentication', () =>
        expect(() => retrieveUserPosts('1243214', '  ', () => { })).to.throw(Error, 'id is empty')
    )

    it('should fail on invalid callback', () =>
        expect(() => retrieveUserPosts('1234', '1243214', '() => { }')).to.throw(Error, 'callback is not a function')
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
