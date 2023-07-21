const { expect } = require('chai');
const retrieveUser = require('./retrieveUser');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError },
    assets: { colors },
} = require('com');

describe('retrieveUser', () => {
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

    it('should get user by id with valid userId', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, []);

        const createdUser = await User.create(user);

        const fetchedUser = await retrieveUser(createdUser.id);

        expect(fetchedUser).to.be.an('object');
        expect(fetchedUser).to.have.property('username', user.username);
        expect(fetchedUser).to.have.property('color', user.color)
        expect(fetchedUser).to.have.property('avatar', user.avatar);
        expect(fetchedUser).to.not.have.property('_id', createdUser.id);
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        await expect(() => retrieveUser(invalidId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        await expect(() => retrieveUser(emptyId)).to.throw(TypeError, 'userId is empty');
    });

});