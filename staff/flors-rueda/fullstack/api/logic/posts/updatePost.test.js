require('dotenv').config();
const { expect } = require('chai');
const { writeFile, readFile } = require('fs');
const updatePost = require('./updatePost');

describe('updatePost', () => {
    beforeEach(done => {
        const posts = [
            {
                id: '456',
                title: 'Test Post',
                content: 'This is a test post',
                author: '789',
                createdAt: Date.now()
            }
        ];
        const users = [
            {
                id: '789',
                username: '@testuser',
                name: 'Test User',
                mail: 'testuser@mail.com',
                avatar: null,
                password: 'TestPassword123',
                joined: Date.now(),
                favs: []
            }
        ];
        const postsJson = JSON.stringify(posts, null, 4);
        const usersJson = JSON.stringify(users, null, 4);
        writeFile('./data/posts.json', postsJson, 'utf8', error => {
            if (error) {
                done(error);
                return;
            }
            writeFile('./data/users.json', usersJson, 'utf8', error => done(error));
        });
    });

    it('should update the post with new text and image', done => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '456';
        const userAuth = '789';

        updatePost(newText, newPostImg, postId, userAuth, error => {
            expect(error).to.be.null;

            readFile('./data/posts.json', 'utf8', (error, json) => {
                if (error) {
                    done(error);
                    return;
                }

                const posts = JSON.parse(json);
                const post = posts.find(post => post.id === postId);
                expect(post.text).to.equal(newText);
                expect(post.image).to.equal(newPostImg);

                done();
            });
        });
    });

    it('should fail when given an invalid post ID', done => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '999';
        const userAuth = '789';

        updatePost(newText, newPostImg, postId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`post with id ${postId} not found`);
            done();
        });
    });

    it('should fail when given an invalid user ID', done => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '456';
        const userAuth = '999';

        updatePost(newText, newPostImg, postId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with id ${userAuth} not found`);
            done();
        });
    });

    it('should fail when the post does not belong to the user', done => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '456';
        const userAuth = '123';

        updatePost(newText, newPostImg, postId, userAuth, error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`post with id ${postId} does not belong to user with id ${userAuth}`);
            done();
        });
    });

    it('should fail on invalid post ID type', () => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = 1234;
        const userAuth = '789';

        expect(() => updatePost(newText, newPostImg, postId, userAuth, () => { })).to.throw(Error, 'id is not a string');
    });

    it('should fail on empty post ID', () => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '  ';
        const userAuth = '789';

        expect(() => updatePost(newText, newPostImg, postId, userAuth, () => { })).to.throw(Error, 'id is empty');
    });

    it('should fail on invalid user ID type', () => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '456';
        const userAuth = 1234;

        expect(() => updatePost(newText, newPostImg, postId, userAuth, () => { })).to.throw(Error, 'id is not a string');
    });

    it('should fail on empty user ID', () => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '456';
        const userAuth = '  ';

        expect(() => updatePost(newText, newPostImg, postId, userAuth, () => { })).to.throw(Error, 'id is empty');
    });

    it('should fail on invalid callback', () => {
        const newText = 'Updated text';
        const newPostImg = 'new-image.png';
        const postId = '456';
        const userAuth = '789';

        expect(() => updatePost(newText, newPostImg, postId, userAuth, '() => { }')).to.throw(Error, 'callback is not a function');
    });

    after(done => {
        writeFile('./data/posts.json', '[]', 'utf8', error => {
            if (error) {
                done(error);
                return;
            }
            writeFile('./data/users.json', '[]', 'utf8', error => done(error));
        });
    });
});
