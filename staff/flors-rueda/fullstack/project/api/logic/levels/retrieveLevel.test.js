require('dotenv').config();

const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const retrieveLevel = require('./retrieveLevel');
const { errors: { TypeError } } = require('com');
const { Level } = require('../../data/models');

describe('retrieveLevel', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should retrieve a level by id', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        const levelData = generate.level(name, layout);
        const createdLevel = await Level.create(levelData);

        const retrievedLevel = await retrieveLevel(createdLevel._id.toString());

        expect(retrievedLevel.id).to.equal(createdLevel._id.toString());
        expect(retrievedLevel.name).to.equal(createdLevel.name);
        expect(retrievedLevel.layout).to.deep.equal(createdLevel.layout);
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;

        await expect(() => retrieveLevel(invalidId)).to.throw(TypeError, 'id is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';

        await expect(() => retrieveLevel(emptyId)).to.throw(TypeError, 'id is empty');
    });
});
