require('dotenv').config();

const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const searchUsers = require('./searchUsers');
const { errors: { ContentError, TypeError }, assets: { colors } } = require('com');


describe('searchUsers', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    });

    beforeEach(async () => {
        await cleanUp();
    })

    after(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await cleanUp();
    });

    it('should find all users that contain the given string', async () => {
        const username = `userA${Math.floor(Math.random() * 999)}`;
        const username2 = `userB${Math.floor(Math.random() * 999)}`;
        const username3 = `userC${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 5, ['beach']);
        const user2 = generate.user(username2, password, 'beach', color, recoveryQuestions, [], [], [], 5, ['beach']);
        const user3 = generate.user(username3, password, 'beach', color, recoveryQuestions, [], [], [], 5, ['beach']);

        const createdUser = await User.create(user);
        await User.create(user2);
        await User.create(user3);

        const retrievedUsers = await searchUsers(createdUser._id.toString(), 'ser');

        expect(retrievedUsers).to.be.an('array');
        expect(retrievedUsers).to.have.lengthOf(2);
        expect(retrievedUsers[0].username).to.equal(username2);
        expect(retrievedUsers[1].username).to.equal(username3);
    });

    it('should find no levels that contain the given string if there is no such level', async () => {
        const username = `UserA${Math.floor(Math.random() * 999)}`;
        const username2 = `UserB${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 5, ['beach']);
        const user2 = generate.user(username2, password, 'beach', color, recoveryQuestions, [], [], [], 5, ['beach']);

        const createdUser = await User.create(user);
        await User.create(user2);

        const retrievedUsers = await searchUsers(createdUser._id.toString(), 'none');

        expect(retrievedUsers).to.be.an('array');
        expect(retrievedUsers).to.have.lengthOf(0);
    });

    it('should fail on user not found', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();

        try {
            searchUsers(userId, 'hello');
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid name type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const username = 1234

        await expect(() => searchUsers(userId, username)).to.throw(TypeError, 'name is not a string');
    });

    it('should fail on empty name', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const username = ''

        await expect(() => searchUsers(userId, username)).to.throw(ContentError, 'name is empty');
    });

    it('should fail on invalid id type', async () => {
        const userId = 12345;
        await expect(() => searchUsers(userId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const userId = '         '

        await expect(() => searchUsers(userId)).to.throw(ContentError, 'userId is empty');
    });

});


