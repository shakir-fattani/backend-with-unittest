const { getSuggestionDAL } = require('../data-layer/index');

const getSuggestion = ({
    query, latitude, longitude, radius, sort,
}) => {
    return getSuggestionDAL({
        sort,
        query,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseInt(radius),
    });
};

module.exports = { getSuggestion };
