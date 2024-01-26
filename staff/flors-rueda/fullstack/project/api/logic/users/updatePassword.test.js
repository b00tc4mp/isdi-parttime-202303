const { expect } = require('chai');
const updatePassword = require('./updatePassword');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, AuthError, ExistenceError },
    assets: { colors },
} = require('com');
const bcrypt = require('bcryptjs');

describe('updatePassword', () => {
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

    it('should update user password with valid userId', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const cryptPassword = await bcrypt.hash(password, 10);

        const user = generate.user(username, cryptPassword, 'beach', color, recoveryQuestions, [], [], [], 2, ['beach']);

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();
        const newPassword = `newPassword${Math.random()}`;

        await updatePassword(id, newPassword, password);
        const updatedUser = await User.findById(id);

        const match = await bcrypt.compare(newPassword, updatedUser.password);

        expect(match).to.equal(true);
    });

    it('should fail on wrong credentials', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, 'different_password', 'beach', color, recoveryQuestions, [], [], [], 2, ['beach']);
        const newPassword = `newPassword${Math.random()}`;

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();

        try {
            await updatePassword(id, newPassword, password);
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError);
            expect(error.message).to.equal('wrong credentials');
        }
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const password = `Password${Math.random()}`;
        const newPassword = `newPassword${Math.random()}`;

        try {
            await updatePassword(id, newPassword, password);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        const password = `Password${Math.random()}`;
        const newPassword = `newPassword${Math.random()}`;
        await expect(() => updatePassword(invalidId, newPassword, password)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        const password = `Password${Math.random()}`;
        const newPassword = `newPassword${Math.random()}`;
        await expect(() => updatePassword(emptyId, newPassword, password)).to.throw(TypeError, 'userId is empty');
    });

    it('should fail on invalid new password type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const password = `Password${Math.random()}`;
        const newPassword = 12345;
        await expect(() => updatePassword(id, newPassword, password)).to.throw(TypeError, 'password is not a string');
    });

    it('should fail on new password to short', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const password = `Password${Math.random()}`;
        const newPassword = 'short';
        await expect(() => updatePassword(id, newPassword, password)).to.throw(RangeError, 'password length lower than 8 characters');
    });

    it('should fail on invalid new password type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const newPassword = `Password${Math.random()}`;
        const password = 12345;
        await expect(() => updatePassword(id, newPassword, password)).to.throw(TypeError, 'password is not a string');
    });

    it('should fail on new password to short', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const newPassword = `Password${Math.random()}`;
        const password = 'short';
        await expect(() => updatePassword(id, newPassword, password)).to.throw(RangeError, 'password length lower than 8 characters');

    });

})