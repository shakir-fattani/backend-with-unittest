const RESTApi = require('faster-api-deploy');
const logger = require('./common/logger');
const { getHealthCheck } = require('./common/health');
const { connectMongoose } = require('./common/mongoose');
const {
    getUpTime, START_TIME, POWERED_BY, VERSION,
    API_VERSION, APP_NAME, SERVER_PORT, HOST_NAME,
} = require('./config');

const isHealth = getHealthCheck();

const app = new RESTApi('', {
    isSupportJSON: false,
    isSupportURLEncode: false,
});

app.setPoweredBy(POWERED_BY);
app.setVersion(VERSION);
app.setApiVersion(API_VERSION);

connectMongoose();
app.get('/health', (req, res) => {
    if (!isHealth()) {
        res.status(400);
        return { alive: false };
    }
    return { alive: true };
});

app.options('/*', (req, res) => res.end());

app.get('/identify', () => {
    const used = process.memoryUsage();

    for (const key in used) used[key] = `${Math.round(used[key] / 1024.0 / 1024.0 * 100.0) / 100} MB`;

    return {
        startTime: START_TIME,
        memory: used,
        upSinceMilliSeconds: getUpTime(),
        appName: APP_NAME,
        version: VERSION,
        HOSTNAME: HOST_NAME,
        apiVersion: API_VERSION,
        cpu: process.cpuUsage(),
    };
});

app.expressUseSingleParam(require('./common/request-logger'));

app.filter((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0
    res.setHeader('Expires', '0');
    next();
});

app.use('/', require('./controllers/index'));

app.expressUseSingleParam((err, req, res, next) => {
    logger.warn(typeof err === 'object' ? (err.message || 'went wrong') : err, { err });
    next(err);
});

app.setListeningIP(HOST_NAME);
app.startListening(SERVER_PORT, 'PRODUCTION', APP_NAME);
