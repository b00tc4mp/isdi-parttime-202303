require('dotenv').config();

const { expect } = require('chai');
const request = require('supertest');
const { api, server } = require('.');
const { cleanUp } = require('./logic/helpers/test');
const sinon = require('sinon');

describe('API routes', () => {
  const date = new Date();
  const fakeDate = sinon.useFakeTimers(date.getTime());

  it('should return a successful response for Hello API GET /', (done) => {
    request(api)
      .get('/')
      .expect(200)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        expect(res.text).to.equal('Hello, API!');

        done();
      });
  });

  it('should return a successful response for register user', (done) => {
    let userJSON = {
      name: 'JohnDoe',
      email: 'john@doe.com',
      password: 'Tes7@@@@',
    };

    request(api)
      .post('/users')
      .send(userJSON)
      .expect(201)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        done();
      });
  });

  it('should return a successful response for authenticate user', (done) => {
    let userJSON = {
      email: 'john@doe.com',
      password: 'Tes7@@@@',
    };

    expectedUserId = 'user-1';

    request(api)
      .post('/users/auth')
      .send(userJSON)
      .expect(200)
      .end((error, res) => {
        if (error) {
          done(error);

          return;
        }

        expect(res.body.userId).to.equal(expectedUserId);
        done();
      });
  });

  it('should return a successful response for retrieve user', (done) => {
    const userId = 'user-1';

    request(api)
      .get('/users')
      .set('Authorization', `Bearer ${userId}`)
      .expect(200)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        expect(res.body.name).to.equal('JohnDoe');
        expect(res.body.avatar).to.equal(null);

        done();
      });
  });

  it('should return a successful response for update avatar', (done) => {
    const userId = 'user-1';
    const newAvatar = {
      avatar: 'https://new-avatar-url.com',
    };

    request(api)
      .patch('/users/updateAvatar')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userId}`)
      .send(newAvatar)
      .expect(204)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        //TODO test if avatar changed in DATA

        done();
      });
  });

  it('should return a successful response for update password', (done) => {
    const userId = 'user-1';
    const newPassword = {
      password: 'Tes7@@@@',
      newPassword: 'Tes7@@@1',
      newPasswordConfirm: 'Tes7@@@1',
    };

    request(api)
      .patch('/users/updatePassword')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userId}`)
      .send(newPassword)
      .expect(204)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        //TODO test if password changed in DATA

        done();
      });
  });

  it('should return a successful response for create post', (done) => {
    const userId = 'user-1';
    const post = {
      image: 'https://new-post/image-url.com',
      text: 'hello world',
    };

    request(api)
      .post('/users/post')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userId}`)
      .send(post)
      .expect(201)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        //TODO test if post is created in DATA

        done();
      });
  });

  it('should return a successful response for favourite post', (done) => {
    const userId = 'user-1';
    const postId = 'post-1';

    request(api)
      .patch(`/posts/favourite/${postId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userId}`)
      .expect(204)
      .end((error, res) => {
        if (error) {
          console.error('Error:', error);
          console.error('Response:', res.body);
          done(error);
          return;
        }

        // TODO: Test if user have favourite post is favourite in data

        done();
      });
  });

  it('should return a successful response for like post', (done) => {
    const userId = 'user-1';
    const postId = 'post-1';

    request(api)
      .patch(`/posts/like/${postId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userId}`)
      .expect(204)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        // TODO: Test if the post is liked in data

        done();
      });
  });

  it('should return a successful response for update post', (done) => {
    const userId = 'user-1';
    const postId = 'post-1';

    const updatePostJSON = {
      image: 'https://update-post/image-url.com',
      text: 'update text',
    };

    request(api)
      .patch(`/posts/updatePost/${postId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userId}`)
      .send(updatePostJSON)
      .expect(204)
      .end((error, res) => {
        if (error) {
          console.error('Error:', error);
          console.error('Response:', res.body);
          done(error);
          return;
        }

        // TODO: Test if the post is updated in data

        done();
      });
  });

  it('should return a successful response for retrieve posts', (done) => {
    const userId = 'user-1';
    const post = [
      {
        id: 'post-1',
        author: {
          id: 'user-1',
          name: 'JohnDoe',
          avatar: 'https://new-avatar-url.com',
        },
        image: 'https://update-post/image-url.com',
        text: 'update text',
        date: date.toISOString(),
        likes: ['user-1'],
        favourites: true,
      },
    ];

    const postJson = JSON.stringify(post);

    request(api)
      .get('/posts/')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userId}`)
      .expect(200)
      .end((error, res) => {
        if (error) {
          done(error);

          return;
        }

        const resBody = JSON.stringify(res.body);

        expect(resBody).to.equal(postJson);

        done();
      });
  });

  it('should return a successful response for retrieve post', (done) => {
    const userId = 'user-1';
    const postId = 'post-1';

    post = {
      id: 'post-1',
      author: 'user-1',
      image: 'https://update-post/image-url.com',
      text: 'update text',
      date: date.toISOString(),
      likes: ['user-1'],
    };

    const postJson = JSON.stringify(post);

    request(api)
      .get(`/posts/${postId}`)
      .set('Authorization', `Bearer ${userId}`)
      .expect(200)
      .end((error, res) => {
        if (error) {
          console.error('Error:', error);
          console.error('Response:', res.body);
          done(error);
          return;
        }

        const resBody = JSON.stringify(res.body);

        expect(resBody).to.equal(postJson);

        done();
      });
  });

  it('should return a successful response for delete post', (done) => {
    const userId = 'user-1';
    const postId = 'post-1';

    request(api)
      .delete(`/posts/deletePost/${postId}`)
      .expect(204)
      .set('Authorization', `Bearer ${userId}`)
      .end((error, res) => {
        if (error) {
          done(error);
          return;
        }

        // TODO: Test if the post is deleted in data

        done();
      });
  });

  after(cleanUp);

  after((done) => {
    fakeDate.restore();

    server.close(done);
  });
});
