const { expect } = require('chai');
const { Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError }
} = require('com');
const updateAdminEmail = require('./updateAdminEmail');

describe('updateAdminEmail', () => {
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

        const newEmail = "b@b.com";

        updateAdminEmail(adminFound._id.toString(), adminFound.email, newEmail, newEmail)

        const adminNewMail = await Administrator.findOne({ _id: adminFound._id });

        expect(adminNewMail.email).to.equal(adminFound.email);
    });

    it('should fail on Administrator not found', async () => {

        try {
            updateAdminEmail('64f71960afe8291e1e4b9643', 'a@a.com', 'b@b.com', 'b@b.com');
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('Administrator not found!');
        }
    });


    it('should fail on incorrect id format', async () => {
        await expect(() => updateAdminEmail('id', 'mail@mail.com', 'mail2@mail.com', 'mail2@mail.com')).to.throw(FormatError, 'User ID does not have 24 characters');
    });

    it('should fail on invalid email type', async () => {
        await expect(() => updateAdminEmail('64f71960afe8291e1e4b9643', 'mail', 'mail2@mail.com', 'mail2@mail.com')).to.throw(ContentError, 'email is no valid');
    });
    it('should fail on invalid new email type', async () => {
        await expect(() => updateAdminEmail('64f71960afe8291e1e4b9643', 'mail@mail.com', 'mail2', 'mail2@mail.com')).to.throw(ContentError, 'email is no valid');
    });
    it('should fail on invalid new email confirmation type', async () => {
        await expect(() => updateAdminEmail('64f71960afe8291e1e4b9643', 'mail@mail.com', 'mail2@mail.com', 'mail2')).to.throw(ContentError, 'email is no valid');
    });
    it('should fail on not matching new email and confimation type', async () => {
        await expect(() => updateAdminEmail('64f71960afe8291e1e4b9643', 'mail@mail.com', 'mail2@mail.com', 'mail3@mail.com')).to.throw(Error);
    });
    it('should fail on using current email as new type', async () => {
        await expect(() => updateAdminEmail('64f71960afe8291e1e4b9643', 'mail2@mail.com', 'mail2@mail.com', 'mail2@mail.com')).to.throw(Error);
    });
    
});