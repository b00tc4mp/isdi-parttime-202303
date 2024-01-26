const { expect } = require('chai');
const checkRecoveryAnswer = require('./checkRecoveryAnswer');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, FormatError, ExistenceError, ContentError },
    assets: { colors },
} = require('com');
const bcrypt = require('bcryptjs');

describe('checkRecoveryAnswer', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    });

    beforeEach(async () => {
        await cleanUp();
    });

    after(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should return true when the answer of id question is correct', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const answer = `answer1${Math.random()}`
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: await bcrypt.hash(answer, 10) }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 1254, ['beach']);

        const createdUser = await User.create(user);
        const questionId = (createdUser.recoveryQuestions[0]._id).toString();

        const isAnswerValid = await checkRecoveryAnswer(username, questionId, answer);

        expect(isAnswerValid).to.equal(true);
    });

    it('should return false when the answer of id question is incorrect', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const answer = `answer1${Math.random()}`;
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: await bcrypt.hash(answer, 10) }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 555, ['beach']);

        const createdUser = await User.create(user);
        const questionId = (createdUser.recoveryQuestions[0]._id).toString();

        const isAnswerValid = await checkRecoveryAnswer(username, questionId, 'not correct answer');

        expect(isAnswerValid).to.equal(false);
    });

    it('should fail on user not found', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const questionId = (new mongoose.Types.ObjectId()).toString();
        const answer = `answer1${Math.random()}`;

        try {
            await checkRecoveryAnswer(username, questionId, answer)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on question not found', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 254, ['beach']);
        await User.create(user);
        const questionId = (new mongoose.Types.ObjectId()).toString();

        try {
            await checkRecoveryAnswer(username, questionId, 'answer')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('question not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const invalidId = 1234;
        const answer = `answer1${Math.random()}`;
        await expect(() => checkRecoveryAnswer(username, invalidId, answer)).to.throw(TypeError, 'questionId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        const username = `User${Math.floor(Math.random() * 999)}`;
        const answer = `answer1${Math.random()}`;
        await expect(() => checkRecoveryAnswer(username, emptyId, answer)).to.throw(TypeError, 'questionId is empty');
    });

    it('should fail on username too long', async () => {
        const username = `UserNameWayTooLong${Math.floor(Math.random() * 999)}`;
        const questionId = (new mongoose.Types.ObjectId()).toString();
        const answer = `answer${Math.random()}`;

        await expect(() => checkRecoveryAnswer(username, questionId, answer)).to.throw(RangeError, 'username is too long');
    });

    it('should fail on invalid username type', async () => {
        const username = Math.floor(Math.random() * 999);
        const questionId = (new mongoose.Types.ObjectId()).toString();
        const answer = `answer${Math.random()}`;

        await expect(() => checkRecoveryAnswer(username, questionId, answer)).to.throw(TypeError, 'username is not a string');
    });

    it('should fail on empty username', async () => {
        const username = '';
        const questionId = (new mongoose.Types.ObjectId()).toString();
        const answer = `answer${Math.random()}`;

        await expect(() => checkRecoveryAnswer(username, questionId, answer)).to.throw(ContentError, 'username is empty');
    });

    it('should fail on incorrect username format', async () => {
        const username = `User--${Math.floor(Math.random() * 999)}`;
        const questionId = (new mongoose.Types.ObjectId()).toString();
        const answer = `answer${Math.random()}`;

        await expect(() => checkRecoveryAnswer(username, questionId, answer)).to.throw(FormatError, 'username format is incorrect');
    });

    it('should fail on invalid answer type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const questionId = (new mongoose.Types.ObjectId()).toString();
        const answer = Math.random();

        await expect(() => checkRecoveryAnswer(username, questionId, answer)).to.throw(TypeError, 'answer is not a string');
    });

    it('should fail on empty answer', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const questionId = (new mongoose.Types.ObjectId()).toString();
        const answer = '';

        await expect(() => checkRecoveryAnswer(username, questionId, answer)).to.throw(ContentError, 'answer is empty');
    });

})