require('dotenv').config();

const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const { Level, User } = require('../../data/models');
const mongoose = require('mongoose');
const searchLevels = require('./searchLevels');
const { errors: { ContentError, TypeError, ExistenceError }, assets: { colors } } = require('com');


describe('retrieveLevels', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should find all levels that contain the given string', async () => {
        const name1 = `search-${Math.random()}`;
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

        const levelData1 = generate.level(name1, layout1, hp1, author1, [], date1);
        const createdLevel1 = await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, author2, [], date2);
        const createdLevel2 = await Level.create(levelData2);

        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);

        const userId = createdUser._id.toString();
        const retrievedLevels = await searchLevels(userId, 'sear');

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(1);

        const retrievedLevel1 = retrievedLevels.find((level) => level.name === name1);

        expect(retrievedLevel1).to.exist;
        expect(retrievedLevel1.name).to.equal(name1);
        expect(retrievedLevel1.author).to.equal(createdLevel1.author.toString());
        expect(retrievedLevel1.likes).to.deep.equal([]);
        expect(retrievedLevel1.date.getTime()).to.be.closeTo(date1, 10000);
    });

    it('should find no levels that contain the given string if there is no such level', async () => {
        const name1 = `search-${Math.random()}`;
        const layout1 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp1 = 1 + Math.floor(Math.random() * 6);
        const author1 = new mongoose.Types.ObjectId()
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
        await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, author2, [], date2);
        await Level.create(levelData2);

        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const userId = createdUser._id.toString();

        const retrievedLevels = await searchLevels(userId, 'none');

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(0);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            searchLevels(id, 'hello');
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid name type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const name = 1234

        await expect(() => searchLevels(userId, name)).to.throw(TypeError, 'name is not a string');
    });

    it('should fail on empty name', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const name = ''

        await expect(() => searchLevels(userId, name)).to.throw(ContentError, 'name is empty');
    });

    it('should fail on invalid id type', async () => {
        const userId = 12345;
        const name = "nanana";

        await expect(() => searchLevels(userId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const userId = '         '

        await expect(() => searchLevels(userId)).to.throw(ContentError, 'userId is empty');
    });

});


