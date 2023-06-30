const context = require('../context');

module.exports = (name, layout, id) => {

    const { levels } = context;

    const level = {
        name: name,
        layout: layout,
        id: id,
    }

    return levels.insertOne(level);

}
