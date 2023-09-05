const { expect } = require('chai');
const { Event, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { Schema, Schema: { Types: { ObjectId } }} = mongoose
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const deleteEvent = require('./deleteEvent');
const createEvent = require('./createEvent');

describe('deleteEvent', () => {
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
    
    it('should delete an Event with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Event.create(adminId, event.title, event.eventDate, event.location, event.text, event.links, event.visibility)
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id;
        await deleteEvent(adminId, eventId);

        expect(Event.find()).to.equal('');

    });

    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        try{createEvent('64f71960afe8291e1e4b9643', event.title, event.eventDate, event.location, event.text, event.links, event.visibility)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Admin does not exist')
        }
    });

    
    it('should fail on incorrect id format', async () => {
        const event = generate.Event();
        await expect(() => createEvent('id', event.title, event.eventDate, event.location, event.text, event.links, event.visibility)).to.throw(FormatError, 'admin id does not have 24 characters');
    });

    it('should fail on invalid title type', async () => {
        const event = generate.Event();
        await expect(() => createEvent('64f71960afe8291e1e4b9643', 3, event.eventDate, event.location, event.text, event.links, event.visibility)).to.throw(TypeError, 'title is not a string');
    });

    it('should fail on invalid text type', async () => {
        const event = generate.Event();
        await expect(() => createEvent('64f71960afe8291e1e4b9643', event.title, event.eventDate, event.location, 3 , event.links, event.visibility)).to.throw(TypeError, 'text is not a string');
    });
});