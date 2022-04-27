const getSuggestion = ({
    query, latitude, longitude, radius, sort,
}) => [query, latitude, longitude, radius, sort];

module.exports = { getSuggestion };
