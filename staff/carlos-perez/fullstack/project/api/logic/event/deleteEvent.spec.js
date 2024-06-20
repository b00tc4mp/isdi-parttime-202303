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

        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id.toString();
        await deleteEvent(adminId.toString(), eventId);
        const result = await Event.find();
        expect(result.length).to.equal(0);
    });

    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;
        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id.toString();
        try{deleteEvent('64f71960afe8291e1e4b9643', eventId)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
        }
    });

    
    it('should fail on incorrect Admin id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;
        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id.toString();
        await expect(() => deleteEvent('id', eventId)).to.throw(FormatError, 'Administrator ID does not have 24 characters');
    });

    it('should fail on incorrect Event id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;
        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id.toString();
        await expect(() => deleteEvent('64f71960afe8291e1e4b9643', 'id')).to.throw(FormatError, 'event ID does not have 24 characters');
    });
     
    it('should fail on not existing event', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;
        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        try{deleteEvent('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643')}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
        }
    });
});