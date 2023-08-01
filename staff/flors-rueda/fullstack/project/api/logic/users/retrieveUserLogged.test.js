const { expect } = require('chai');
const retrieveUserLogged = require('./retrieveUserLogged');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError },
    assets: { colors },
} = require('com');

//TODO add joined to test

describe('retrieveUserLogged', () => {
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

        const fetchedUser = await retrieveUserLogged(createdUser.id);

        expect(fetchedUser).to.be.an('object');
        expect(fetchedUser).to.have.property('username', user.username);
        expect(fetchedUser).to.have.property('color', user.color)
        expect(fetchedUser).to.have.property('avatar', user.avatar);
        expect(fetchedUser.recoveryQuestions[0].question).to.equal(recoveryQuestions[0].question);
        expect(fetchedUser.recoveryQuestions[0].answer).to.equal(recoveryQuestions[0].answer);
        expect(fetchedUser.recoveryQuestions[1].question).to.equal(recoveryQuestions[1].question);
        expect(fetchedUser.recoveryQuestions[1].answer).to.equal(recoveryQuestions[1].answer);
        expect(fetchedUser).to.not.have.property('_id', createdUser.id);
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        await expect(() => retrieveUserLogged(invalidId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        await expect(() => retrieveUserLogged(emptyId)).to.throw(TypeError, 'userId is empty');
    });

});