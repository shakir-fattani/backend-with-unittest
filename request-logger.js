const morgan = require('morgan');
const logger = require('./logger');

const toStr = ({
    time, method, status, url, contentLength, responseTime, totalTime, remoteAddr,
}) => `${time}\t${remoteAddr}\t${method}\t${status}\t${url}\t${contentLength}\t${responseTime}ms:${totalTime}ms`;

module.exports = morgan((tokens, req, res) => {
    const status = tokens.status(req, res);

    if (status === '404') return;

    logger.info('access-log: ', toStr({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        contentLength: tokens.res(req, res, 'content-length'),
        time: tokens.date(req, res, 'iso'),
        responseTime: tokens['response-time'](req, res),
        totalTime: tokens['total-time'](req, res),
        remoteAddr: `${req.headers['x-real-ip']} >> ${tokens['remote-addr'](req, res)}`,
        httpVersion: tokens['http-version'](req, res),
        referrer: tokens.referrer(req, res),
        userAgent: tokens['user-agent'](req, res),
    }));
});
