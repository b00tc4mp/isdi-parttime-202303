const { Level } = require('../../data/models');

module.exports = () => {
    return Level.find()
        .select('_id name author likes date')
        .then(levels => {
            return levels.map(level => {
                return {
                    id: level._id.toString(),
                    name: level.name,
                    author: level.author.toString(),
                    likes: level.likes,
                    date: level.date,
                };
            });
        });
};
