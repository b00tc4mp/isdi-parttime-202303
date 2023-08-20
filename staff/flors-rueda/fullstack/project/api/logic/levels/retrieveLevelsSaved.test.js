require('dotenv').config();

const retrieveLevelsSaved = require('./retrieveLevelsSaved');
const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const { Level, User } = require('../../data/models');
const mongoose = require('mongoose');
const { errors: { ContentError, TypeError, ExistenceError },
    assets: { colors },
} = require('com');

describe('retrieveLevelsSaved', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should retrieve all levels saved by user id', async () => {
        const name1 = `level-${Math.random()}`;
        const layout1 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp1 = 1 + Math.floor(Math.random() * 6);
        const author1 = new mongoose.Types.ObjectId();
        const date1 = Date.now();

        const name2 = `level-${Math.random()}`;
        const layout2 = [
            ['start', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'empty'],
            ['life', 'empty', 'bomb', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp2 = 1 + Math.floor(Math.random() * 6);
        const author2 = new mongoose.Types.ObjectId();
        const date2 = Date.now();

        const name3 = `level-${Math.random()}`;
        const layout3 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp3 = 1 + Math.floor(Math.random() * 6);
        const author3 = new mongoose.Types.ObjectId();
        const date3 = Date.now();

        const levelData1 = generate.level(name1, layout1, hp1, author1, [], date1);
        const level1 = await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, author2, [], date2);
        await Level.create(levelData2);
        const levelData3 = generate.level(name3, layout3, hp3, author3, [], date3);
        const level3 = await Level.create(levelData3);

        const levelId = (level1._id).toString();
        const levelId2 = (level3._id).toString();

        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [levelId, levelId2], [], [], 1234, ['beach']);

        const createdUser = await User.create(user);
        const userId = (createdUser._id).toString();

        const retrievedLevels = await retrieveLevelsSaved(userId);

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(2);

        const retrievedLevel1 = retrievedLevels.find((level) => level.name === name1);
        const retrievedLevel2 = retrievedLevels.find((level) => level.name === name3);

        expect(retrievedLevel1).to.exist;
        expect(retrievedLevel1.name).to.equal(name1);
        expect(retrievedLevel1.author).to.equal(author1.toString());
        expect(retrievedLevel1.likes).to.deep.equal([]);
        expect(retrievedLevel1.date.getTime()).to.be.closeTo(date1, 10000);

        expect(retrievedLevel2).to.exist;
        expect(retrievedLevel2.name).to.equal(name3);
        expect(retrievedLevel2.author).to.equal(author3.toString());
        expect(retrievedLevel2.likes).to.deep.equal([]);
        expect(retrievedLevel2.date.getTime()).to.be.closeTo(date3, 10000);
    });

    it('should retrieve no levels if user has no levels saved', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 1234, ['beach']);

        const createdUser = await User.create(user);
        const userId = (createdUser._id).toString();

        const levels = await retrieveLevelsSaved(userId);
        expect(levels).to.have.lengthOf(0);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            retrieveLevelsSaved(id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const userId = 12345;
        await expect(() => retrieveLevelsSaved(userId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const userId = '         '
        await expect(() => retrieveLevelsSaved(userId)).to.throw(ContentError, 'userId is empty');
    });
});


