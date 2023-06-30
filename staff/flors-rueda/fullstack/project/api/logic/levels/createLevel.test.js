require('dotenv').config();

const { expect } = require('chai');
const createLevel = require('./createLevel');
const context = require('../context');
const { MongoClient } = require('mongodb');
const { cleanUp, generate } = require('../helpers/tests');

//TODO Add testing of validators and unhappy paths

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

        await createLevel(name, layout, id);

        const createdLevel = await generate.level(name, layout, id);

        expect(createdLevel.name).to.equal(name);
        expect(createdLevel.layout).to.deep.equal(layout);
        expect(createdLevel.id).to.equal(id);
    });
});
