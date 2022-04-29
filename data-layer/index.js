const Location = require('./models/city');

const addDistanceFieldinCity = (long, lat, radius) => ({
    $geoNear: {
        near: {
            type: 'Point',
            coordinates: [long, lat],
        },
        maxDistance: radius,
        spherical: true,
        distanceField: 'distance',
        distanceMultiplier: 0.000621371,
    },
});

const getSuggestionDAL = ({
    query, latitude, longitude, radius, sort,
}) => {
    console.log({
        query, latitude, longitude, radius, sort,
    });
    return Location.aggregate([
        addDistanceFieldinCity(longitude, latitude, radius),
    ]);
};

const addLocations = (locationObjs = []) => Location.insertMany(locationObjs)
module.exports = { getSuggestionDAL, addLocations };
