const RestApi = require('faster-api-deploy');

const router = new RestApi.RESTRouter();

router.use('/location', require('./location-controller'));

module.exports = router;
