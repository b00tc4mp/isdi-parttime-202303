const { expect } = require('chai');
const recoverPassword = require('./recoverPassword');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ContentError, FormatError, ExistenceError },
    assets: { colors },
} = require('com');
const bcrypt = require('bcryptjs');

describe('recoverPassword', () => {
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

    it('should update user password with valid userId', async function () {
        this.timeout(5000);
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const newPassword = `newPassword${Math.random()}`;

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 648, ['beach']);

        await User.create(user);

        await recoverPassword(username, newPassword);
        const updatedUser = await User.findOne({ username });

        const match = await bcrypt.compare(newPassword, updatedUser.password);

        expect(match).to.equal(true);
    });

    it('should fail on user not found', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const newPassword = `Password${Math.random()}`;

        try {
            await recoverPassword(username, newPassword);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on username too long', async () => {
        const username = `UserNameWayTooLong${Math.floor(Math.random() * 999)}`;
        const newPassword = `Password${Math.random()}`;

        await expect(() => recoverPassword(username, newPassword)).to.throw(RangeError, 'username is too long');
    });

    it('should fail on invalid username type', async () => {
        const username = Math.floor(Math.random() * 999);
        const newPassword = `Password${Math.random()}`;

        await expect(() => recoverPassword(username, newPassword)).to.throw(TypeError, 'username is not a string');
    });

    it('should fail on empty username', async () => {
        const username = '';
        const newPassword = `Password${Math.random()}`;

        await expect(() => recoverPassword(username, newPassword)).to.throw(ContentError, 'username is empty');
    });

    it('should fail on incorrect username format', async () => {
        const username = `User--${Math.floor(Math.random() * 999)}`;
        const newPassword = `Password${Math.random()}`;

        await expect(() => recoverPassword(username, newPassword)).to.throw(FormatError, 'username format is incorrect');
    });

    it('should fail on invalid password type', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const newPassword = 12345;
        await expect(() => recoverPassword(username, newPassword)).to.throw(TypeError, 'password is not a string');
    });

    it('should fail on password to short', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const newPassword = 'short';
        await expect(() => recoverPassword(username, newPassword)).to.throw(RangeError, 'password length lower than 8 characters');
    });

});