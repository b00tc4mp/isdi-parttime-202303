const { expect } = require('chai');
const { Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError }
} = require('com');
const deleteAdmin = require('./deleteAdmin');

describe('deleteAdmin', () => {
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

    it('should delete a Administrator with correct credentials', async () => {

        const admin = generate.Administrator();

        const email = admin.email;

        await Administrator.create(admin);

        const adminFound = await Administrator.findOne({ email: email });

        const adminId = adminFound.id;

        const adminDeleted = await deleteAdmin(adminId, 'password', 'password');

        expect(adminDeleted.acknowledged).to.be.true;
    });

    it('should fail on Administrator not found', async () => {
        const admin = generate.Administrator();

        await Administrator.create(admin);

        try {
            await deleteAdmin('64f71960afe8291e1e4b9643', 'password2', 'password2');
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('Administrator not found!');
        }
    });

    it('should fail on wrong credentials', async () => {
        const admin = generate.Administrator();

        await Administrator.create(admin);

        const adminFound = await Administrator.findOne({ email: admin.email });

        const adminId = adminFound.id;

        try {
            await deleteAdmin(adminId, 'password2', 'password2');
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError);
            expect(error.message).to.equal('Wrong password');
        }
    });



    it('should fail on incorrect id format', async () => {
        await expect(() => deleteAdmin('id', 'password', 'password')).to.throw(FormatError, 'Administrator ID does not have 24 characters');
    });

    it('should fail on invalid password type', async () => {

        await expect(() => deleteAdmin('64f71960afe8291e1e4b9643', 3 , 'password2')).to.throw(TypeError, 'Password is not a string');
    });

    it('should fail on invalid confirmation password type', async () => {

        await expect(() => deleteAdmin('64f71960afe8291e1e4b9643', 'password' , 3)).to.throw(TypeError, 'Password Confirmation is not a string');
    });

    it('should fail on different passwords provided', async () => {

        await expect(() => deleteAdmin('64f71960afe8291e1e4b9643', 'password' , 'password2')).to.throw(ContentError, 'Password and confirmation do NOT match. Check it');
    });
});