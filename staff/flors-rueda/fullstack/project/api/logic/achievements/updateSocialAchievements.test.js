const { expect } = require('chai');
const updateSocialAchievements = require('./updateSocialAchievements');
const { Level, User, Achievements } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError },
    assets: { colors },
} = require('com');
const achievements = require('../../data/achievements');

describe('updateSocialAchievements', () => {
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

    it('should update user social achievements by id with valid userId', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const mockId = (new mongoose.Types.ObjectId()).toString();

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [mockId, mockId], [mockId, mockId, mockId, mockId, mockId, mockId, mockId], [mockId, mockId, mockId, mockId, mockId, mockId, mockId], 5, ['beach']);

        const createdUser = await User.create(user);

        const allAchievements = achievements.map(achievement => ({ ...achievement }));

        const userId = createdUser._id;

        const userAchievements = generate.achievements(userId, allAchievements);

        await Achievements.create(userAchievements);

        const name1 = `level-${Math.random()}`;
        const layout1 = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp1 = 1 + Math.floor(Math.random() * 6);
        const date1 = Date.now();

        const name2 = `level-${Math.random()}`;
        const layout2 = [
            ['start', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'empty'],
            ['life', 'empty', 'bomb', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp2 = 1 + Math.floor(Math.random() * 6);
        const date2 = Date.now();

        const levelData1 = generate.level(name1, layout1, hp1, userId, [userId], date1);
        await Level.create(levelData1);
        const levelData2 = generate.level(name2, layout2, hp2, userId, [mockId, mockId], date2);
        await Level.create(levelData2);

        await updateSocialAchievements(userId.toString());

        const updatedAchievements = await Achievements.findOne({ user: userId });

        const socialAchievements = updatedAchievements.progressByAchievement.filter(
            achievement => achievement.category === 'social'
        );

        expect(socialAchievements[0].code).to.equal('S01');
        expect(socialAchievements[0].progress).to.equal(7);
        expect(socialAchievements[0].isRankBronzeReached).to.equal(true);
        expect(socialAchievements[0].isRankGoldReached).to.equal(false);
        expect(socialAchievements[1].code).to.equal('S02');
        expect(socialAchievements[1].progress).to.equal(7);
        expect(socialAchievements[1].isRankBronzeReached).to.equal(true);
        expect(socialAchievements[1].isRankGoldReached).to.equal(false);
        expect(socialAchievements[2].code).to.equal('S03');
        expect(socialAchievements[2].progress).to.equal(1);
        expect(socialAchievements[2].isRankBronzeReached).to.equal(true);
        expect(socialAchievements[2].isRankGoldReached).to.equal(false);
        expect(socialAchievements[3].code).to.equal('S04');
        expect(socialAchievements[3].progress).to.equal(2);
        expect(socialAchievements[3].isRankBronzeReached).to.equal(true);
        expect(socialAchievements[3].isRankGoldReached).to.equal(false);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            await updateSocialAchievements(id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        try {
            await updateSocialAchievements(invalidId);
        } catch (error) {
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        try {
            await updateSocialAchievements(emptyId);
        } catch (error) {
            expect(error.message).to.equal('userId is empty');
        }
    });
});