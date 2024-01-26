const { expect } = require('chai');
const retrieveCompleteAchievements = require('./retrieveCompleteAchievements');
const { User, Achievements } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError },
} = require('com');
const achievements = require('../../data/achievements');

describe('retrieveCompleteAchievements', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    });

    beforeEach(async () => {
        await cleanUp();
    })

    after(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should get user completed achievements by id with valid userId', async () => {
        const allAchievements = achievements.map(achievement => ({ ...achievement }));

        allAchievements[3].isRankGoldReached = true;
        allAchievements[3].isRankBronzeReached = true;
        allAchievements[3].progress = 561;
        allAchievements[4].isRankBronzeReached = true;
        allAchievements[4].progress = 2;
        allAchievements[6].progress = 999999;
        allAchievements[6].isRankGoldReached = true;
        allAchievements[6].isRankBronzeReached = true;
        allAchievements[15].isRankBronzeReached = true;
        allAchievements[15].progress = 27;
        allAchievements[15].isRankSilverReached = true

        const userId = new mongoose.Types.ObjectId();

        const userAchievements = generate.achievements(userId, allAchievements);

        await Achievements.create(userAchievements);

        const fetchedAchievements = await retrieveCompleteAchievements(userId.toString());

        expect(fetchedAchievements).to.be.an('array');
        expect(fetchedAchievements.length).to.equal(4);
        expect(fetchedAchievements[0].code).to.equal('G04');
        expect(fetchedAchievements[0].name).to.equal('junkrat');
        expect(fetchedAchievements[0].rank).to.equal('gold');
        expect(fetchedAchievements[1].code).to.equal('G05');
        expect(fetchedAchievements[1].name).to.equal('kitten');
        expect(fetchedAchievements[1].rank).to.equal('bronze');
        expect(fetchedAchievements[2].code).to.equal('CC02');
        expect(fetchedAchievements[2].name).to.equal('shopalcoholic');
        expect(fetchedAchievements[2].rank).to.equal('gold');
        expect(fetchedAchievements[3].code).to.equal('S03');
        expect(fetchedAchievements[3].name).to.equal('everybody say love');
        expect(fetchedAchievements[3].rank).to.equal('silver');
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        try {
            await retrieveCompleteAchievements(id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        await expect(() => retrieveCompleteAchievements(invalidId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        await expect(() => retrieveCompleteAchievements(emptyId)).to.throw(TypeError, 'userId is empty');
    });

});