const { getSuggestionDAL } = require('../data-layer/index');

const getSuggestion = ({
    query, latitude, longitude, radius, sort,
}) => getSuggestionDAL({
    query, latitude, longitude, radius, sort,
});

module.exports = { getSuggestion };
