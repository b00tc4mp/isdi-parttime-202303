const { expect } = require('chai');
const registerUser = require('./registerUser');
const { User, Achievements } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp } = require('../helpers/tests');
const {
    errors: { DuplicityError, ContentError, FormatError },
    assets: { colors },
} = require('com');
const bcrypt = require('bcryptjs');

describe('registerUser', () => {
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

    it('should create a user', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const answer1 = (recoveryQuestions[0].answer).toLowerCase();
        const answer2 = (recoveryQuestions[1].answer).toLowerCase();

        const date = Date.now();

        await registerUser(username, password, color, recoveryQuestions);

        const createdUser = await User.findOne({ username });
        const createdAchievements = await Achievements.findOne({ user: createdUser._id });

        const match = await bcrypt.compare(password, createdUser.password);
        const matchAnswer1 = await bcrypt.compare(answer1, (createdUser.recoveryQuestions[0].answer));
        const matchAnswer2 = await bcrypt.compare(answer2, (createdUser.recoveryQuestions[1].answer));

        expect(createdUser.username).to.equal(username);
        expect(match).to.equal(true);
        expect(createdUser.color).to.equal(color);
        expect(createdUser.joined.getTime()).to.be.closeTo(date, 10000);
        expect(createdUser.avatar).to.equal('beach');
        expect(createdUser.saves).to.be.an('array');
        expect(createdUser.follows).to.be.an('array');
        expect(createdUser.followers).to.be.an('array');
        expect(createdUser.unlockAvatars).to.deep.equal(['beach']);
        expect(createdUser.cc).to.equal(500);
        expect(createdUser.recoveryQuestions[0].question).to.equal(recoveryQuestions[0].question);
        expect(matchAnswer1).to.equal(true);
        expect(createdUser.recoveryQuestions[1].question).to.equal(recoveryQuestions[1].question);
        expect(matchAnswer2).to.equal(true);
        expect(createdAchievements.progressByAchievement).to.be.an('array');
    });

    it('should fail on user already registered', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await registerUser(username, password, color, recoveryQuestions);

        try {
            await registerUser(username, password, color, recoveryQuestions);
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError);
            expect(error.message).to.equal(`user with username ${username} already exists`);
        }
    });

    it('should fail on username too long', async () => {
        const username = `UserNameWayTooLong${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(RangeError, 'username is too long');
    });

    it('should fail on invalid username type', async () => {
        const username = Math.floor(Math.random() * 999);
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(TypeError, 'username is not a string');
    });

    it('should fail on empty username', async () => {
        const username = '';
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(ContentError, 'username is empty');
    });

    it('should fail on incorrect username format', async () => {
        const username = `User--${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(FormatError, 'username format is incorrect');
    });

    it('should fail on invalid password type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = Math.random();
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(TypeError, 'password is not a string');
    });

    it('should fail on password to short', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = '';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(RangeError, 'password length lower than 8 characters');
    });

    it('should fail on invalid color type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = Math.floor(Math.random() * colors.length);
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(TypeError, 'color is not a string');
    });

    it('should fail on empty color', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = '';
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(ContentError, 'color is empty');
    });

    it('should fail on not included color', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = 'white';
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(ContentError, 'color is not included');
    });

    it('should fail on incorrect recovery question type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            `question${Math.random()} answer${Math.random()}`
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(TypeError, 'question is not an object');
    });

    it('should fail on incomplet question', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(ContentError, 'missing question and/or answer');
    });

    it('should fail on incorrect question and answer type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: Math.random(), answer: Math.random() }
        ];

        await expect(() => registerUser(username, password, color, recoveryQuestions)).to.throw(TypeError, 'question and/or answer is not a string');
    });


});