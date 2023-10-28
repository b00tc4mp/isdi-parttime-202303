const { Administrator, Update, Event, LyricPost, Message, UsersData } = require ('../../../data/models');

const cleanUp = () => {
  return Promise.all([
    Administrator.deleteMany(),
    Update.deleteMany(),
    Event.deleteMany(),
    LyricPost.deleteMany(),
    Message.deleteMany(),
    UsersData.deleteMany()]
  )
}

module.exports = cleanUp;