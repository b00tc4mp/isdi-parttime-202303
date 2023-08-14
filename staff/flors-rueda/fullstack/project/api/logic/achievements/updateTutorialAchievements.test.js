const { expect } = require('chai');
const updateTutorialAchievements = require('./updateTutorialAchievements');
const { Achievements } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError },
} = require('com');
const achievements = require('../../data/achievements');

describe('updateTutorialAchievements', () => {
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

    it('should update user create achievements by id with valid userId', async () => {
        const allAchievements = achievements.map(achievement => ({ ...achievement }));

        const userId = new mongoose.Types.ObjectId();

        const userAchievements = generate.achievements(userId, allAchievements);

        await Achievements.create(userAchievements);

        await updateTutorialAchievements(userId.toString());

        const updatedAchievements = await Achievements.findOne({ user: userId });

        const gameAchievements = updatedAchievements.progressByAchievement.filter(
            achievement => achievement.category === 'tutorial'
        );

        expect(gameAchievements[0].code).to.equal('T01');
        expect(gameAchievements[0].progress).to.equal(1);
        expect(gameAchievements[0].isRankBronzeReached).to.equal(true);
        expect(gameAchievements[0].isRankSilverReached).to.equal(true);
        expect(gameAchievements[0].isRankGoldReached).to.equal(true);

    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            await updateTutorialAchievements(id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        await expect(() => updateTutorialAchievements(invalidId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        await expect(() => updateTutorialAchievements(emptyId)).to.throw(TypeError, 'userId is empty');
    });
});