const { expect } = require('chai');
const retrieveRandomRecoveryQuestion = require('./retrieveRandomRecoveryQuestion');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError, ContentError, FormatError },
    assets: { colors },
} = require('com');
const bcrypt = require('bcryptjs');

describe('retrieveRandomRecoveryQuestion', () => {
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

    it('should get a random security question and the id on a valid username', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const answer = `answer1${Math.random()}`
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: await bcrypt.hash(answer, 10) }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 5, ['beach']);

        const createdUser = await User.create(user);
        const randomRecoveryQuestion = await retrieveRandomRecoveryQuestion(username);
        const questionId = (createdUser.recoveryQuestions[0]._id).toString();

        expect(randomRecoveryQuestion).to.be.an('object');
        expect(randomRecoveryQuestion).to.have.property('id', questionId);
        expect(randomRecoveryQuestion).to.have.property('question', recoveryQuestions[0].question);
    });
    it('should fail on user not found', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;

        try {
            await retrieveRandomRecoveryQuestion(username);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on username too long', async () => {
        const username = `UserNameWayTooLong${Math.floor(Math.random() * 999)}`;

        await expect(() => retrieveRandomRecoveryQuestion(username)).to.throw(RangeError, 'username is too long');
    });

    it('should fail on invalid username type', async () => {
        const username = Math.floor(Math.random() * 999);

        await expect(() => retrieveRandomRecoveryQuestion(username)).to.throw(TypeError, 'username is not a string');
    });

    it('should fail on empty username', async () => {
        const username = '';

        await expect(() => retrieveRandomRecoveryQuestion(username)).to.throw(ContentError, 'username is empty');
    });

    it('should fail on incorrect username format', async () => {
        const username = `User--${Math.floor(Math.random() * 999)}`;

        await expect(() => retrieveRandomRecoveryQuestion(username)).to.throw(FormatError, 'username format is incorrect');
    });
});