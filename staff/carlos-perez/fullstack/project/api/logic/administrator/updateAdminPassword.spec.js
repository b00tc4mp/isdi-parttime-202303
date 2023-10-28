const { expect } = require('chai');
const { Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError }
} = require('com');
const updateAdminEmail = require('./updateAdminEmail');
const updateAdminPassword = require('./updateAdminPassword');

describe('updateAdminPassword', () => {
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

    it('should update an Administrator email with correct credentials', async () => {

        const admin = generate.Administrator();

        await Administrator.create(admin);

        const adminFound = await Administrator.findOne({ email: admin.email });

        const newPassword = 'password2';

        updateAdminPassword(adminFound._id.toString(), adminFound.password, newPassword, newPassword)

        const adminNewPassword = await Administrator.findOne({ _id: adminFound._id });

        expect(adminNewPassword.password).to.equal(adminFound.password);
    });

    it('should fail on Administrator not found', async () => {

        try {
            updateAdminPassword('64f71960afe8291e1e4b9643', 'password', 'password2', 'password2');
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('Administrator not found!');
        }
    });


    it('should fail on incorrect id format', async () => {
        await expect(() => updateAdminPassword('id', 'password', 'password2', 'password2')).to.throw(FormatError, 'User ID does not have 24 characters');
    });

    it('should fail on invalid password type', async () => {
        await expect(() => updateAdminPassword('64f71960afe8291e1e4b9643', 3 , 'password2', 'password2')).to.throw(TypeError, 'password is not a string');
    });
    it('should fail on invalid new password type', async () => {
        await expect(() => updateAdminPassword('64f71960afe8291e1e4b9643', 'password', 3, 'password2')).to.throw(TypeError, 'password is not a string');
    });
    it('should fail on invalid new password confirmation type', async () => {
        await expect(() => updateAdminPassword('64f71960afe8291e1e4b9643', 'password', 'password2', 3)).to.throw(TypeError, 'New password confirmation is not a string');
    });
    it('should fail on not matching new password and confimation type', async () => {
        await expect(() => updateAdminPassword('64f71960afe8291e1e4b9643', 'password' , 'password3', 'password2')).to.throw(ContentError);
    });
    
});