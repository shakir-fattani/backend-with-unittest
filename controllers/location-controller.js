const RestApi = require('faster-api-deploy');
const { LocationService } = require('../services/index');

const router = new RestApi.RESTRouter();

router.get('/suggestions', async (req) => {
    const {
        q, latitude, longitude, radius, sort,
    } = req.query;
    return {
        suggestions: await LocationService.getSuggestion({
            latitude,
            longitude,
            radius,
            sort,
            query: q,
        }),
    };
});

module.exports = router;
