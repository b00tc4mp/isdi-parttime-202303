require('dotenv').config();

const { expect } = require('chai');
const createLevel = require('./createLevel');
const context = require('../context');
const { MongoClient } = require('mongodb');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { ContentError },
} = require('com');

describe('createLevel', () => {
    let client;
    let db;

    before(async () => {
        client = await MongoClient.connect(process.env.MONGODB_URL);
        db = client.db();
        context.levels = db.collection('levels');
    });

    after(async () => {
        await client.close();
    });

    afterEach(async () => {
        await cleanUp();
    });

    it('should create a level', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        await createLevel(name, layout);

        const createdLevel = await generate.level(name, layout);

        expect(createdLevel.name).to.equal(name);
        expect(createdLevel.layout).to.deep.equal(layout);
    });

    it('should fail on empty name', async () => {
        const name = '  ';
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        await expect(() => createLevel(name, layout).to.throw(ContentError, 'name is empty'));
    });

    it('should fail on invalid name type', async () => {
        const name = 1234;
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        await expect(() => createLevel(name, layout).to.throw(TypeError, 'name is not a string'));
    });

    it('should fail on invalid layout type', async () => {
        const name = `level-${Math.random()}`;
        const layout = `
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        `;

        await expect(() => createLevel(name, layout).to.throw(TypeError, 'layout is not an array'));
    });

    it('should fail on invalid layout length', async () => {
        const name = `level-${Math.random()}`;
        const layout = [];

        await expect(() => createLevel(name, layout).to.throw(RangeError, 'layout length should be between 1 and 100'));
    });

    it('should fail on invalid floor type', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            `'empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'`,
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ]

        await expect(() => createLevel(name, layout).to.throw(TypeError, 'floor is not an array'));
    });

    it('should fail on invalid floor length', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ]

        await expect(() => createLevel(name, layout).to.throw(RangeError, 'floor length should be 9'));
    });

    it('should fail on invalid floor item type', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['bomb', 1, 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ]

        await expect(() => createLevel(name, layout).to.throw(TypeError, 'floor item is not a string'));
    });

    it('should fail on to many start items', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'start', 'hole', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'start', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        await expect(() => createLevel(name, layout).to.throw(ContentError, 'invalid start items'));
    });

    it('should fail on not enough start items', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'dirt', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'hole'],
            ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        await expect(() => createLevel(name, layout).to.throw(ContentError, 'invalid start items'));
    });

    it('should fail on not enough hole items', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'dirt', 'empty', 'dirt', 'bomb', 'dirt', 'start', 'dirt'],
            ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        await expect(() => createLevel(name, layout).to.throw(ContentError, 'invalid hole items'));
    });

    it('should fail on hole items on last floor', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'dirt', 'empty', 'hole', 'bomb', 'dirt', 'start', 'dirt'],
            ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'hole', 'stonks'],
        ];

        await expect(() => createLevel(name, layout).to.throw(ContentError, 'invalid hole items'));
    });

    it('should fail on hole stonks in incorrect floor', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'dirt', 'empty', 'hole', 'bomb', 'stonks', 'start', 'dirt'],
            ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'hole', 'life'],
        ];

        await expect(() => createLevel(name, layout).to.throw(ContentError, 'invalid stonks items'));
    });

    it('should fail on too many stonks in last floor', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'dirt', 'empty', 'hole', 'bomb', 'dirt', 'start', 'dirt'],
            ['life', 'start', 'dirt', 'life', 'stonks', 'empty', 'bomb', 'stonks', 'life'],
        ];

        await expect(() => createLevel(name, layout).to.throw(ContentError, 'invalid stonks items'));
    });


})
