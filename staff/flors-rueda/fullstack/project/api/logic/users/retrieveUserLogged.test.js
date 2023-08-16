const { expect } = require('chai');
const retrieveUserLogged = require('./retrieveUserLogged');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError },
    assets: { colors },
} = require('com');

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

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 5, ['beach']);

        const createdUser = await User.create(user);

        const fetchedUser = await retrieveUserLogged(createdUser.id);

        expect(fetchedUser).to.be.an('object');
        expect(fetchedUser).to.have.property('username', user.username);
        expect(fetchedUser).to.have.property('color', user.color);
        expect(fetchedUser.saves).to.be.an('array');
        expect(fetchedUser).to.have.property('avatar', user.avatar);
        expect(fetchedUser).to.not.have.property('recoveryQuestions');
        expect(fetchedUser).to.not.have.property('_id', createdUser.id);
        expect(fetchedUser).to.have.property('cc', user.cc);
        expect(fetchedUser.joined.getTime()).to.be.closeTo(Date.now(), 10000);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        try {
            await retrieveUserLogged(id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
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