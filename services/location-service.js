const { getSuggestionDAL } = require('../data-layer/index');

const getSuggestion = ({
    query, latitude, longitude, radius, sort,
}) => getSuggestionDAL({
    sort,
    query,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    radius: parseInt(radius, 10),
});

module.exports = { getSuggestion };
