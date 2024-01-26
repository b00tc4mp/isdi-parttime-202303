const { expect } = require('chai');
const authenticateUser = require('./authenticateUser');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError },
    assets: { colors },
} = require('com');
const bcrypt = require('bcryptjs');

describe('authenticateUser', () => {
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

    it('should login a user with correct credentials', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const saves = [];

        const cryptPassword = bcrypt.hashSync(password, 10);

        const user = generate.user(username, cryptPassword, 'beach', color, recoveryQuestions, saves, [], [], 100, ['beach']);

        await User.create(user);

        const userId = await authenticateUser(username, password);

        expect(userId).to.be.a('string').and.not.empty;
    });

    it('should fail on user not found', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;

        try {
            await authenticateUser(username, password);
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

        await User.create(user);

        try {
            await authenticateUser(username, password);
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError);
            expect(error.message).to.equal('wrong credentials');
        }
    });

    it('should fail on invalid username type', async () => {
        const username = Math.floor(Math.random() * 999);
        const password = `Password${Math.random()}`;

        await expect(() => authenticateUser(username, password)).to.throw(TypeError, 'username is not a string');
    });

    it('should fail on username too long', async () => {
        const username = `UserNameWayTooLong${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;

        await expect(() => authenticateUser(username, password)).to.throw(RangeError, 'username is too long');
    });


    it('should fail on empty username', async () => {
        const username = '';
        const password = `Password${Math.random()}`;

        await expect(() => authenticateUser(username, password)).to.throw(ContentError, 'username is empty');
    });

    it('should fail on incorrect username format', async () => {
        const username = `User--${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;

        await expect(() => authenticateUser(username, password)).to.throw(FormatError, 'username format is incorrect');
    });

    it('should fail on invalid password type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = Math.random();

        await expect(() => authenticateUser(username, password)).to.throw(TypeError, 'password is not a string');
    });

    it('should fail on password to short', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = '';

        await expect(() => authenticateUser(username, password)).to.throw(RangeError, 'password length lower than 8 characters');
    });
});