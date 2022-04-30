const Location = require('./models/location');

const getSuggestionDAL = ({
    query, latitude, longitude, radius, sort = 'distance',
}) => {
    console.log({
        query, latitude, longitude, radius, sort,
    });
    let location = Location.aggregate();
    if (latitude || longitude || radius) {
        location = location.near({
            near: { type: 'Point', coordinates: [longitude, latitude] },
            distanceField: 'distance',
            maxDistance: parseInt(radius, 10) || 10000000,
        });
    }
    if (query) {
        location = location.match({
            name: { $search: query },
        });
    }

    return location.sort({ [sort]: 'asc' }).read();
};

const addLocationObj = async (locationObj = {}) => {
    const l = await Location.create(locationObj);
    await l.save();
    return l;
};

module.exports = { getSuggestionDAL, addLocationObj };
