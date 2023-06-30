require('dotenv').config();

const { expect } = require('chai');
const context = require('../context');
const { MongoClient } = require('mongodb');
const { cleanUp, generate } = require('../helpers/tests');
const retrieveLevel = require('./retrieveLevel');

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
        const id = `id-${Math.random()}`;

        const level = generate.level(name, layout, id);

        await context.levels.insertOne(level);

        const retrievedLevel = await retrieveLevel(level._id.toString());

        expect(retrievedLevel.name).to.equal(name);
        expect(retrievedLevel.layout).to.deep.equal(layout);
        expect(retrievedLevel.id).to.equal(id);
    });
});