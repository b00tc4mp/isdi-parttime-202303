require('dotenv').config();

const retrieveLevels = require('./retrieveLevels');
const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const { Level } = require('../../data/models');


describe('retrieveLevels', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should retrieve all levels', async () => {
        const name1 = `level-${Math.random()}`;
        const layout1 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        const name2 = `level-${Math.random()}`;
        const layout2 = [
            ['start', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'empty'],
            ['life', 'empty', 'bomb', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        const levelData1 = generate.level(name1, layout1);
        const levelData2 = generate.level(name2, layout2);

        await Level.create(levelData1);
        await Level.create(levelData2);

        const retrievedLevels = await retrieveLevels();

        expect(retrievedLevels).to.be.an('array');
        expect(retrievedLevels).to.have.lengthOf(2);

        const retrievedLevel1 = retrievedLevels.find((level) => level.name === name1);
        const retrievedLevel2 = retrievedLevels.find((level) => level.name === name2);

        expect(retrievedLevel1).to.exist;
        expect(retrievedLevel1.name).to.equal(name1);

        expect(retrievedLevel2).to.exist;
        expect(retrievedLevel2.name).to.equal(name2);
    });

    it('should retrieve no levels if database is empty', async () => {
        const levels = await retrieveLevels();
        expect(levels).to.have.lengthOf(0);
    });
});


