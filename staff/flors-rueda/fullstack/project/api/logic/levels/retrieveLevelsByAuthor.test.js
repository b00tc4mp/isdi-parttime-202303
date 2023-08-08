require('dotenv').config();

const retrieveLevelsByAuthor = require('./retrieveLevelsByAuthor');
const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const { Level } = require('../../data/models');
const mongoose = require('mongoose');
const { errors: { ContentError, TypeError } } = require('com');


describe('retrieveLevelsByAuthor', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should retrieve all levels', async () => {
        const name1 = `level-${Math.random()}`;
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
        const author2 = new mongoose.Types.ObjectId();
        const date2 = Date.now();

        const name3 = `level-${Math.random()}`;
        const layout3 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp3 = 1 + Math.floor(Math.random() * 6);
        const author3 = author1;
        const date3 = Date.now();

        const levelData1 = generate.level(name1, layout1, hp1, author1, [], date1);
        await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, author2, [], date2);
        await Level.create(levelData2);
        const levelData3 = generate.level(name3, layout3, hp3, author3, [], date3);
        await Level.create(levelData3);

        const authorId = author1.toString();

        const retrievedLevels = await retrieveLevelsByAuthor(authorId);

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(2);

        const retrievedLevel1 = retrievedLevels.find((level) => level.name === name1);
        const retrievedLevel2 = retrievedLevels.find((level) => level.name === name3);

        expect(retrievedLevel1).to.exist;
        expect(retrievedLevel1.name).to.equal(name1);
        expect(retrievedLevel1.author).to.equal(authorId);
        expect(retrievedLevel1.likes).to.deep.equal([]);
        expect(retrievedLevel1.date.getTime()).to.be.closeTo(date1, 10000);

        expect(retrievedLevel2).to.exist;
        expect(retrievedLevel2.name).to.equal(name3);
        expect(retrievedLevel2.author).to.equal(authorId);
        expect(retrievedLevel2.likes).to.deep.equal([]);
        expect(retrievedLevel2.date.getTime()).to.be.closeTo(date3, 10000);
    });

    it('should retrieve no levels if database is empty', async () => {
        const authorId = (new mongoose.Types.ObjectId()).toString();
        const levels = await retrieveLevelsByAuthor(authorId);
        expect(levels).to.have.lengthOf(0);
    });

    it('should fail on invalid author type', async () => {
        const authorId = 12345;
        await expect(() => retrieveLevelsByAuthor(authorId)).to.throw(TypeError, 'authorId is not a string');
    });

    it('should fail on empty id', async () => {
        const authorId = '         '

        await expect(() => retrieveLevelsByAuthor(authorId)).to.throw(ContentError, 'authorId is empty');
    });
});


