const context = require('../context');

module.exports = () => {
    const { levels } = context;

    return Promise.all([levels.find().toArray()])
        .then(([levels]) => {

            levels.forEach(level => {
                level.id = level._id.toString();
                delete level._id;
                delete level.layout;
            })

            return levels
        })
}
