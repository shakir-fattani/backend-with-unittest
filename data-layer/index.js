const Location = require('./models/location');

const getSuggestionDAL = async ({
    query, latitude, longitude, radius, sort = 'distance',
}) => {
    let location = Location.aggregate();
    if (latitude || longitude || radius) {
        const nearQ = {
            near: { type: 'Point', coordinates: [longitude, latitude] },
            distanceField: 'distance',
            spherical: true,
            distanceMultiplier: 0.001, // 1 km => 1000 meter, so 0.001 km => 1 meter
        };
        if (radius && radius > 0) {
            nearQ.maxDistance = radius * 1000;
        }

        location = location.near(nearQ);
    }
    if (query) {
        location = location.match({
            name: {
                $regex: query,
                $options: 'i',
            },
        });
    }
    location = location.project({
        name: 1,
        location: 1,
        distance: 1,
    }).sort({ [sort]: 'asc' });
    return new Promise((res, rej) => {
        location.exec((err, result) => {
            if (err) rej(err);
            else {
                res(result.map((re) => ({
                    name: re.name,
                    latitude: re.location.coordinates[1],
                    longitude: re.location.coordinates[0],
                    distance: re.distance,
                })));
            }
        });
    });
};

const addLocationObj = async (locationObj = {}) => {
    const l = await Location.create(locationObj);
    await l.save();
    return l;
};

module.exports = { getSuggestionDAL, addLocationObj };
