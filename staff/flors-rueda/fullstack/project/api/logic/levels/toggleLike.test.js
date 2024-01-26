const { expect } = require('chai');
const toggleLike = require('./toggleLike');
const { User, Level } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { ContentError, ExistenceError },
    assets: { colors },
} = require('com');

describe('toggleLike', () => {
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

    it('should update the presence of the user id in the likes array of the level', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 1234, ['beach']);

        const createdUser = await User.create(user);

        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = new mongoose.Types.ObjectId();
        const date = Date.now();
        const userId = createdUser._id.toString();

        const levelData = generate.level(name, layout, hp, author, [userId], date);
        const createdLevel = await Level.create(levelData);
        const levelId = createdLevel._id.toString();

        await toggleLike(levelId, userId);

        const updatedLevel = await Level.findOne({ name });

        expect((updatedLevel.likes).includes(userId)).to.be.false;

        await toggleLike(levelId, userId);

        const updatedLevelAgain = await Level.findOne({ name });

        expect((updatedLevelAgain.likes).includes(userId)).to.be.true;

    });

    it('should fail on level not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            await toggleLike(id, id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('level not found');
        }
    });

    it('should fail on user not found', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = new mongoose.Types.ObjectId();
        const date = Date.now();

        const levelData = generate.level(name, layout, hp, author, [], date);
        const createdLevel = await Level.create(levelData);
        const levelId = createdLevel._id.toString();

        const userId = (new mongoose.Types.ObjectId()).toString();

        try {
            await toggleLike(levelId, userId);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid levelId type', async () => {
        const levelId = 1234;
        const userId = (new mongoose.Types.ObjectId()).toString();
        try {
            await toggleLike(levelId, userId);
            throw new Error('Test should have thrown a TypeError');
        } catch (error) {
            expect(error.message).to.equal('levelId is not a string');
        }
    });

    it('should fail on empty levelId', async () => {
        const levelId = '   ';
        const userId = (new mongoose.Types.ObjectId()).toString();
        try {
            await toggleLike(levelId, userId);
            throw new Error('Test should have thrown a ContentError');
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError);
            expect(error.message).to.equal('levelId is empty');
        }
    });

    it('should fail on invalid userId type', async () => {
        const levelId = (new mongoose.Types.ObjectId()).toString();
        const userId = 1234;
        try {
            await toggleLike(levelId, userId);
            throw new Error('Test should have thrown a TypeError');
        } catch (error) {
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty userId', async () => {
        const levelId = (new mongoose.Types.ObjectId()).toString();
        const userId = '   ';
        try {
            await toggleLike(levelId, userId);
            throw new Error('Test should have thrown a ContentError');
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError);
            expect(error.message).to.equal('userId is empty');
        }
    });

});