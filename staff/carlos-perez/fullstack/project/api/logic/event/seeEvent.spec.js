const { expect } = require('chai');
const { Event, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { Schema, Schema: { Types: { ObjectId } }} = mongoose
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const seeEvent = require('./deleteEvent');
const modifyEvent = require('./modifyEvent');

describe('seeEvent', () => {
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
    
    it('should see an Event', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id.toString();

        const result = await seeEvent(adminId.toString(),eventId);
        expect(result).to.exist
        expect(result).to.not.be.instanceOf(ExistenceError)

        //await expect(() => seeEvent(adminId.toString(),eventId)).to.exist;
    });

    it('should fail on incorrect Event id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility});
        
        await expect(() => seeEvent('64f71960afe8291e1e4b9643', 'id')).to.throw(FormatError, 'event ID does not have 24 characters');
    });
     
    it('should fail on not existing event', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id.toString();
        /*
        const result = await seeEvent('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643');
        await expect(result).to.be.instanceOf(ExistenceError);*/
        try{seeEvent('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643')}

        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.be('This event does not exist')
        }
    });
});