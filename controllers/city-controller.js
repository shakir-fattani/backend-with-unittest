const RestApi = require('faster-api-deploy');
const { CityService } = require('../services/index');

const router = new RestApi.RESTRouter();

router.get('/suggestions', (req) => {
    const {
        q, latitude, longitude, radius, sort,
    } = req.query;

    return {
        suggestions: CityService.getSuggestion({
            latitude,
            longitude,
            radius,
            sort,
            query: q,
        }),
    };
});

module.exports = router;
