const { Level } = require('../../data/models');

module.exports = () => {
    return Level.find()
        .select('_id name')
        .then(levels => {
            return levels.map(level => {
                return {
                    id: level._id.toString(),
                    name: level.name
                };
            });
        });
};
