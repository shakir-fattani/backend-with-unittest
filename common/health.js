const logger = require('./logger');

let isHealthy = true;
let canWork = false;

const reportError = (serviceName, error) => {
    if (canWork === true) {
        isHealthy = false;
        logger.error('TerminatorEvent: informing to health-probe', { serviceName, error });
    }
};

module.exports = {
    reportError,
    getHealthCheck: () => {
        canWork = true;
        return () => isHealthy;
    },
};
