const { expect } = require('chai');
const addRecoveryQuestion = require('./addRecoveryQuestion');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError },
    assets: { colors },
} = require('com');
const bcrypt = require('bcryptjs');

describe('addRecoveryQuestion', () => {
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

    it('should add new questions with correct credentials', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const saves = [];
        const newQuestion = [{ question: `question${Math.random()}`, answer: `answer${Math.random()}` }]
        const cryptPassword = bcrypt.hashSync(password, 10);

        const user = generate.user(username, cryptPassword, 'beach', color, recoveryQuestions, saves, [], [], 100, ['beach']);

        const createdUser = await User.create(user);
        const userId = createdUser._id.toString();

        await addRecoveryQuestion(userId, password, newQuestion);
        const updatedUser = await User.findById(userId);
        const updatedNewQuestions = updatedUser.recoveryQuestions;

        const matchAnswer = await bcrypt.compare(newQuestion[0].answer, (updatedNewQuestions[2].answer));

        expect(updatedNewQuestions.length).to.equal(3)
        expect(matchAnswer).to.equal(true);
    });

    it('should fail on user not found', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const password = `Password${Math.random()}`;
        const newQuestion = [{ question: `question${Math.random()}`, answer: `answer${Math.random()}` }]

        try {
            await addRecoveryQuestion(userId, password, newQuestion);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on wrong credentials', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, 'different_password', 'beach', color, recoveryQuestions, [], [], [], 0, ['beach']);
        const newQuestion = [{ question: `question${Math.random()}`, answer: `answer${Math.random()}` }]

        const createdUser = await User.create(user);

        try {
            await addRecoveryQuestion(createdUser._id.toString(), password, newQuestion);
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError);
            expect(error.message).to.equal('wrong credentials');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        const newQuestion = [{ question: `question${Math.random()}`, answer: `answer${Math.random()}` }]
        const password = `Password${Math.random()}`;

        try {
            await addRecoveryQuestion(invalidId, password, newQuestion);
        } catch (error) {
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        const newQuestion = [{ question: `question${Math.random()}`, answer: `answer${Math.random()}` }]
        const password = `Password${Math.random()}`;

        try {
            await addRecoveryQuestion(emptyId, password, newQuestion);
        } catch (error) {
            expect(error.message).to.equal('userId is empty');
        }
    });

    it('should fail on invalid password type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const newQuestion = [{ question: `question${Math.random()}`, answer: `answer${Math.random()}` }]
        const password = Math.random();

        try {
            await addRecoveryQuestion(userId, password, newQuestion);
        } catch (error) {
            expect(error.message).to.equal('password is not a string');
        }
    });

    it('should fail on password to short', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const newQuestion = [{ question: `question${Math.random()}`, answer: `answer${Math.random()}` }]
        const password = 'short';

        try {
            await addRecoveryQuestion(userId, password, newQuestion);
        } catch (error) {
            expect(error.message).to.equal('password length lower than 8 characters');
        }
    });

    it('should fail on incorrect recovery question type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const newQuestion = `question${Math.random()} answer${Math.random()}`
        const password = `Password${Math.random()}`;

        try {
            await addRecoveryQuestion(userId, password, newQuestion);
        } catch (error) {
            expect(error.message).to.equal('question is not an object');
        }
    });

    it('should fail on incomplet question', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const newQuestion = [
            { question: `question${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const password = `Password${Math.random()}`;

        try {
            await addRecoveryQuestion(userId, password, newQuestion);
        } catch (error) {
            expect(error.message).to.equal('missing question and/or answer');
        }
    });

    it('should fail on incorrect question and answer type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const newQuestion = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: Math.random(), answer: Math.random() }
        ];
        const password = `Password${Math.random()}`;

        try {
            await addRecoveryQuestion(userId, password, newQuestion);
        } catch (error) {
            expect(error.message).to.equal('question and/or answer is not a string');
        }
    });
});