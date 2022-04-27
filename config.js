const minimist = require('minimist');
const os = require('os');
const { version } = require('./package.json');

const PARAMS = minimist(process.argv.slice(2));

const APP_NAME = 'Api System';
const POWERED_BY = 'https://github.com/shakir-fattani';
const VERSION = version;
const API_VERSION = '1.0';

const HOST_NAME = PARAMS.hostServer || process.env.HOSTNAME || os.hostname() || 'localhost';

const SERVER_PORT = PARAMS.serverDisplayPort || process.env.SERVER_DISPLAY_PORT || 36000;
const MONGOOSE_DEBUGER = PARAMS.mongooseDebugger || process.env.MONGOOSE_DEBUGER || false;
const MONGO_DB_URI = PARAMS.mongoDBUri || process.env.MONGO_DB_URI || 'mongodb://localhost:27017/city';

let debugValue = 0;
const getDebug = () => debugValue;
const setDebug = (val) => { debugValue = val; };

const START_TIME = Date.now();
const getUpTime = () => Date.now() - START_TIME;

module.exports = {
    APP_NAME,
    POWERED_BY,
    VERSION,
    API_VERSION,
    HOST_NAME,
    SERVER_PORT,
    MONGO_DB_URI,
    START_TIME,
    MONGOOSE_DEBUGER,

    getDebug,
    setDebug,
    getUpTime,
};
