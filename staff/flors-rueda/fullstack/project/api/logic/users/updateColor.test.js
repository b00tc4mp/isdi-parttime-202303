const { expect } = require('chai');
const updateColor = require('./updateColor');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ContentError, ExistenceError },
    assets: { colors },
} = require('com');

describe('updateColor', () => {
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

    it('should update user color with valid userId', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();

        const newColor = colors[Math.floor(Math.random() * colors.length)];

        await updateColor(id, newColor);

        const updatedUser = await User.findById(id);

        expect(updatedUser).to.be.an('object');
        expect(updatedUser).to.have.property('color', newColor)
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const color = colors[Math.floor(Math.random() * colors.length)];

        try {
            await updateColor(id, color);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        const color = colors[Math.floor(Math.random() * colors.length)];
        await expect(() => updateColor(invalidId, color)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        const color = colors[Math.floor(Math.random() * colors.length)];
        await expect(() => updateColor(emptyId, color)).to.throw(TypeError, 'userId is empty');
    });

    it('should fail on invalid color type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const color = Math.floor(Math.random() * colors.length);

        await expect(() => updateColor(id, color)).to.throw(TypeError, 'color is not a string');
    });

    it('should fail on empty color', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const color = '   ';

        await expect(() => updateColor(id, color)).to.throw(ContentError, 'color is empty');
    });

    it('should fail on not included color', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const color = 'black';

        await expect(() => updateColor(id, color)).to.throw(ContentError, 'color is not included');
    });
});