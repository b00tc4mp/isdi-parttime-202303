require('dotenv').config();
const { expect } = require('chai');
const { writeFile, readFile } = require('fs');
const uploadPost = require('./uploadPost');

describe('uploadPost', () => {
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

    it('should upload a new post successfully', done => {
        const postImg = 'testimage.jpg';
        const postText = 'This is a test post';
        const userAuth = '123';

        uploadPost(postImg, postText, userAuth, error => {
            expect(error).to.be.null;

            readFile('./data/posts.json', 'utf8', (error, json) => {
                if (error) {
                    done(error);
                    return;
                }

                const posts = JSON.parse(json);
                const uploadedPost = posts.find(post => post.author === userAuth && post.text === postText);

                expect(uploadedPost).to.exist;
                expect(uploadedPost.image).to.equal(postImg);

                done();
            });
        });
    });

    it('should fail when given an invalid user ID', done => {
        const postImg = 'testimage.jpg';
        const postText = 'This is a test post';
        const userAuth = '999';

        uploadPost(postImg, postText, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userAuth} not found`);
            done();
        });
    });

    it('should fail on invalid post text type', () =>
        expect(() => uploadPost('testimage.jpg', 1234, '123', () => { })).to.throw(Error, 'postText is not a string')
    );

    it('should fail on empty post text', () =>
        expect(() => uploadPost('testimage.jpg', '  ', '123', () => { })).to.throw(Error, 'postText is empty')
    );

    it('should fail on invalid user authentication type', () =>
        expect(() => uploadPost('testimage.jpg', 'This is a test post', 1234, () => { })).to.throw(Error, 'userAuth is not a string')
    );

    it('should fail on empty user authentication', () =>
        expect(() => uploadPost('testimage.jpg', 'This is a test post', '  ', () => { })).to.throw(Error, 'userAuth is empty')
    );

    it('should fail on invalid callback', () =>
        expect(() => uploadPost('testimage.jpg', 'This is a test post', '123', '() => { }')).to.throw(Error, 'callback is not a function')
    );

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
