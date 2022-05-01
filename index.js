const stoppable = require('stoppable');
const app = require('./app');
const logger = require('./common/logger');
const {
    APP_NAME, SERVER_PORT, HOST_NAME,
} = require('./config');

// just for demonstrate that it really doesn't receive requests after 4s
const DEBUG_DELAY = process.env.DEBUG_DELAY || 2000;
// failureThreshold: 2, periodSeconds: 2 (4s)
const READINESS_PROBE_DELAY = process.env.READINESS_PROBE_DELAY || 2 * 2 * 1000;

const main = async () => {
    app.setListeningIP(HOST_NAME);
    const server = await app.startListening(SERVER_PORT, 'PRODUCTION', APP_NAME);

    stoppable(server, READINESS_PROBE_DELAY + DEBUG_DELAY);

    function gracefulStop() {
        logger.warn('Received kill signal, shutting down gracefully');

        server.stop(() => {
            logger.warn('Closed out remaining connections');
            process.exit(0);
        });
    }

    // do not accept more request
    process.on('SIGTERM', () => {
        logger.warn('Got SIGTERM. Graceful shutdown start', new Date().toISOString());
        gracefulStop();
    });
};

main();
