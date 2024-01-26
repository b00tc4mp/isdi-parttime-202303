const { expect } = require('chai');
const retrieveUnlockAvatars = require('./retrieveUnlockAvatars');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError },
    assets: { colors },
} = require('com');

describe('retrieveUnlockAvatars', () => {
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

    it('should retrieve cc with valid userId', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach', 'blue', 'candy', 'dark', 'disco']);

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();

        const unlockAvatars = await retrieveUnlockAvatars(id);

        expect(unlockAvatars).to.be.an('array');
        expect(unlockAvatars).to.deep.equal(['beach', 'blue', 'candy', 'dark', 'disco']);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            await retrieveUnlockAvatars(id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        await expect(() => retrieveUnlockAvatars(invalidId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        await expect(() => retrieveUnlockAvatars(emptyId)).to.throw(TypeError, 'userId is empty');
    });

});