const Location = require('./models/location');

const getSuggestionDAL = async ({
    query, latitude, longitude, radius, sort = 'distance',
}) => {
    console.log({
        query, latitude, longitude, radius, sort,
    });
    let location = Location.aggregate();
    if (latitude || longitude || radius) {
        const nearQ = {
            near: { type: 'Point', coordinates: [longitude, latitude] },
            distanceField: 'distance',
        };
        if (radius && radius > 0) {
            nearQ.maxDistance = radius;
        }

        location = location.near(nearQ);
    }
    if (query) {
        location = location.match({
            name: {
                $regex: query,
                $options: "i",
            },
        });
    }
    location = location.project({
        name: 1,
        location:1,
        distance:1,
    }).sort({ [sort]: 'asc' });
    return new Promise((res, rej) => {
        location.exec((err, result) => {
            if (err) rej(err)
            else res(result.map(re => ({
                name: re.name,
                latitude: re.location.coordinates[1],
                longitude: re.location.coordinates[0],
                distance: re.distance,
            })))
        });
    });    
};

const addLocationObj = async (locationObj = {}) => {
    const l = await Location.create(locationObj);
    await l.save();
    return l;
};

module.exports = { getSuggestionDAL, addLocationObj };
