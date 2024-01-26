const { expect } = require('chai');
const updateCC = require('./updateCC');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError, ContentError },
    assets: { colors },
} = require('com');

describe('updateCC', () => {
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

    it('should add cc with valid userId and positive value', async () => {
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
        const cc = 25;
        const operator = '+';

        await updateCC(id, cc, operator);

        const updatedUser = await User.findById(id);

        expect(updatedUser).to.be.an('object');
        expect(updatedUser).to.have.property('cc', 75);
    });

    it('should remove cc with valid userId and negative value', async () => {
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
        const cc = 25;
        const operator = '-';

        await updateCC(id, cc, operator);

        const updatedUser = await User.findById(id);

        expect(updatedUser).to.be.an('object');
        expect(updatedUser).to.have.property('cc', 25);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = 1234;
        const operator = '+';

        try {
            await updateCC(id, cc, operator);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        const cc = 1234;
        const operator = '+';

        await expect(() => updateCC(invalidId, cc, operator)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        const cc = 1234;
        const operator = '+';

        await expect(() => updateCC(emptyId, cc, operator)).to.throw(TypeError, 'userId is empty');
    });

    it('should fail on invalid CC type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = '1223';
        const operator = '+';

        await expect(() => updateCC(id, cc, operator)).to.throw(TypeError, 'cc is not a number');
    });

    it('should fail on negative CC', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = -55;
        const operator = '+';

        await expect(() => updateCC(id, cc, operator)).to.throw(ContentError, 'cc value is not correct');
    });

    it('should fail on invalid operator type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = 1223;
        const operator = 1;

        await expect(() => updateCC(id, cc, operator)).to.throw(TypeError, 'operator is not a string');
    });

    it('should fail on invalid operator', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = 55;
        const operator = 'x';

        await expect(() => updateCC(id, cc, operator)).to.throw(ContentError, 'operator not correct');
    });

});