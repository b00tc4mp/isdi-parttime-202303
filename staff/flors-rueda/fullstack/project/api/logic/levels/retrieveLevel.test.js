require('dotenv').config();

const { expect } = require('chai');
const context = require('../context');
const { MongoClient } = require('mongodb');
const { cleanUp, generate } = require('../helpers/tests');
const retrieveLevel = require('./retrieveLevel');

describe('retrieveLevel', () => {
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

    it('should retrieve a level', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        const level = generate.level(name, layout);

        await context.levels.insertOne(level);

        const retrievedLevel = await retrieveLevel(level._id.toString());

        expect(retrievedLevel.name).to.equal(name);
        expect(retrievedLevel.layout).to.deep.equal(layout);
    });

    it('should fail on no existing id', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];

        const level = generate.level(name, layout);

        await expect(() => retrieveLevel(level._id.toString()).to.throw(Error, 'level not found'))
    });

    it('should fail on invalid id type', async () => {
        await expect(() => retrieveLevel(1234).to.throw(TypeError, 'id is not a string'));
    })


    it('should fail on empty id', async () => {
        await expect(() => retrieveLevel('   ').to.throw(TypeError, 'id is empty'));
    })
});