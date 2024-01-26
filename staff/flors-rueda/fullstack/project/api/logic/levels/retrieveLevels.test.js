require('dotenv').config();

const retrieveLevels = require('./retrieveLevels');
const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const { Level, User } = require('../../data/models');
const mongoose = require('mongoose');
const { errors: { ContentError, TypeError, ExistenceError }, assets: { colors } } = require('com');


describe('retrieveLevels', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should retrieve all levels sorted by newest', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const author1 = createdUser._id;
        const name1 = `level-${Math.random()}`;
        const layout1 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp1 = 1 + Math.floor(Math.random() * 6);
        const date1 = Date.now();

        const name2 = `level-${Math.random()}`;
        const layout2 = [
            ['start', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'empty'],
            ['life', 'empty', 'bomb', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp2 = 1 + Math.floor(Math.random() * 6);
        const author2 = new mongoose.Types.ObjectId()
        const date2 = Date.now();

        const levelData1 = generate.level(name1, layout1, hp1, author1, [], date1);
        const createdLevel1 = await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, author2, [], date2);
        const createdLevel2 = await Level.create(levelData2);

        const dataLevels = await retrieveLevels(author1.toString(), 1, 1);

        const retrievedLevels = dataLevels.levels;

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(2);

        const retrievedLevel1 = retrievedLevels.find((level) => level.name === name1);
        const retrievedLevel2 = retrievedLevels.find((level) => level.name === name2);

        expect(retrievedLevel1).to.exist;
        expect(retrievedLevel1.name).to.equal(name1);
        expect(retrievedLevel1.author).to.equal(createdLevel1.author.toString());
        expect(retrievedLevel1.likes).to.deep.equal([]);
        expect(retrievedLevel1.date.getTime()).to.be.closeTo(date1, 10000);

        expect(retrievedLevel2).to.exist;
        expect(retrievedLevel2.name).to.equal(name2);
        expect(retrievedLevel2.author).to.equal(createdLevel2.author.toString());
        expect(retrievedLevel2.likes).to.deep.equal([]);
        expect(retrievedLevel2.date.getTime()).to.be.closeTo(date2, 10000);
    });

    it('should retrieve all levels sorted by oldest', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const author1 = createdUser._id;

        const name1 = `level-${Math.random()}`;
        const layout1 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp1 = 1 + Math.floor(Math.random() * 6);
        const date1 = Date.now();

        const name2 = `level-${Math.random()}`;
        const layout2 = [
            ['start', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'empty'],
            ['life', 'empty', 'bomb', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp2 = 1 + Math.floor(Math.random() * 6);
        const author2 = new mongoose.Types.ObjectId()
        const date2 = Date.now();

        const levelData1 = generate.level(name1, layout1, hp1, author1, [], date1);
        const createdLevel1 = await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, author2, [], date2);
        const createdLevel2 = await Level.create(levelData2);

        const dataLevels = await retrieveLevels(author1.toString(), 1, 1);

        const retrievedLevels = dataLevels.levels;

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(2);

        const retrievedLevel1 = retrievedLevels.find((level) => level.name === name1);
        const retrievedLevel2 = retrievedLevels.find((level) => level.name === name2);

        expect(retrievedLevel1).to.exist;
        expect(retrievedLevel1.name).to.equal(name1);
        expect(retrievedLevel1.author).to.equal(createdLevel1.author.toString());
        expect(retrievedLevel1.likes).to.deep.equal([]);
        expect(retrievedLevel1.date.getTime()).to.be.closeTo(date1, 10000);

        expect(retrievedLevel2).to.exist;
        expect(retrievedLevel2.name).to.equal(name2);
        expect(retrievedLevel2.author).to.equal(createdLevel2.author.toString());
        expect(retrievedLevel2.likes).to.deep.equal([]);
        expect(retrievedLevel2.date.getTime()).to.be.closeTo(date2, 10000);
    });

    it('should retrieve all levels sorted by likes', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const author1 = createdUser._id;

        const name1 = `level-${Math.random()}`;
        const layout1 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp1 = 1 + Math.floor(Math.random() * 6);
        const date1 = Date.now();

        const name2 = `level-${Math.random()}`;
        const layout2 = [
            ['start', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'empty'],
            ['life', 'empty', 'bomb', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp2 = 1 + Math.floor(Math.random() * 6);
        const author2 = new mongoose.Types.ObjectId();
        const date2 = Date.now();

        const levelData1 = generate.level(name1, layout1, hp1, author1, [], date1);
        const createdLevel1 = await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, author2, [], date2);
        const createdLevel2 = await Level.create(levelData2);

        const dataLevels = await retrieveLevels(author1.toString(), 2, 1);

        const retrievedLevels = dataLevels.levels;

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(2);

        const retrievedLevel1 = retrievedLevels.find((level) => level.name === name1);
        const retrievedLevel2 = retrievedLevels.find((level) => level.name === name2);

        expect(retrievedLevel1).to.exist;
        expect(retrievedLevel1.name).to.equal(name1);
        expect(retrievedLevel1.author).to.equal(createdLevel1.author.toString());
        expect(retrievedLevel1.likes).to.deep.equal([]);
        expect(retrievedLevel1.date.getTime()).to.be.closeTo(date1, 10000);

        expect(retrievedLevel2).to.exist;
        expect(retrievedLevel2.name).to.equal(name2);
        expect(retrievedLevel2.author).to.equal(createdLevel2.author.toString());
        expect(retrievedLevel2.likes).to.deep.equal([]);
        expect(retrievedLevel2.date.getTime()).to.be.closeTo(date2, 10000);
    });

    it('should retrieve no levels if database is empty', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const userId = createdUser._id;
        const dataLevels = await retrieveLevels(userId.toString(), 0, 1);
        const retrievedLevels = dataLevels.levels;

        expect(retrievedLevels).to.have.lengthOf(0);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            retrieveLevels(id, 1, 1);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const userId = 12345;
        try {
            retrieveLevels(userId, 1, 1);
        } catch (error) {
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty id', async () => {
        const userId = '         '
        try {
            retrieveLevels(userId, 1, 1);
        } catch (error) {
            expect(error.message).to.equal('userId is empty');
        }
    });

    it('should fail on invalid sorting type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        try {
            retrieveLevels(userId, 'number?', 1);
        } catch (error) {
            expect(error.message).to.equal('sort criteria is not a number');
        }
    });

    it('should fail on sorting not in range', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        try {
            retrieveLevels(userId, 42, 1);
        } catch (error) {
            expect(error.message).to.equal('sort criteria not on range');
        }
    });

    it('should fail on invalid page type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        try {
            retrieveLevels(userId, 1, 'number?');
        } catch (error) {
            expect(error.message).to.equal('page is not a number');
        }
    });

    it('should fail on page not in range', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        try {
            retrieveLevels(userId, 1, 0);
        } catch (error) {
            expect(error.message).to.equal('invalid page value');
        }
    });
});


