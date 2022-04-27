const RestApi = require('faster-api-deploy');

const router = new RestApi.RESTRouter();

router.use('/city', require('./city-controller'));

module.exports = router;
