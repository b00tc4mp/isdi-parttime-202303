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
const modifyEvent = require('./modifyEvent');

describe('modifyEvent', () => {
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
    
    it('should modify an Event with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        const eventId=eventFound._id.toString();

        await modifyEvent(adminId.toString(), eventId, 'prueba', event.eventDate, event.location, event.text, event.links, event.visibility);
        
        const eventMod = await Event.findOne({ title: 'prueba' });

        expect(eventMod.title).to.equal('prueba');
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
        try{modifyEvent('64f71960afe8291e1e4b9643', eventId, 'prueba', event.eventDate, event.location, event.text, event.links, event.visibility)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.be('Admin does not exist')
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
        await expect(() => modifyEvent('id', eventId, 'prueba', event.eventDate, event.location, event.text, event.links, event.visibility).to.throw(FormatError, 'Administrator ID does not have 24 characters'));
    });

    it('should fail on incorrect Event id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const event = generate.Event();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Event.create({author: adminId, title: event.title, eventDate: event.eventDate, location: event.location, text: event.text, links: event.links, visibility: event.visibility})
        const eventFound = await Event.findOne({ title: event.title });
        
        await expect(() => modifyEvent('64f71960afe8291e1e4b9643', 'id', 'prueba', event.eventDate, event.location, event.text, event.links, event.visibility)).to.throw(FormatError, 'event id does not have 24 characters');
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
        try{modifyEvent('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643', 'prueba', event.eventDate, event.location, event.text, event.links, event.visibility)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.be('This event does not exist')
        }
    });

    it('should fail on incorrect title format', async () => {
        await expect(() => modifyEvent('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643', 3 , 'eventDate' , 'location' , 'text' , [] , true)).to.throw(TypeError, 'title is not a string');
    });

    it('should fail on incorrect text format', async () => {
        await expect(() => modifyEvent('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643', 'title' , 'eventDate' , 'location' , 3 , [] , true)).to.throw(TypeError, 'text is not a string');
    });

    it('should fail on incorrect location format', async () => {
        await expect(() => modifyEvent('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643', 'title' , 'eventDate' , 3 , 'text' , [] , true)).to.throw(TypeError, 'location is not a string');
    });
});