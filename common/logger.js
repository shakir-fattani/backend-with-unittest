const now = () => `${new Date().toISOString()}:::>>> `;

const error = (message, extra = undefined) => console.error(now(), message, extra);

const warn = (message, extra = undefined) => console.warn(now(), message, extra);

const info = (message, extra = undefined) => console.log(now(), message, extra);

const verbose = (message, extra = undefined) => console.verbose(now(), message, extra);

const debug = (message, extra = undefined) => console.debug(now(), message, extra);

const silly = (message, extra = undefined) => console.debug(now(), message, extra);

module.exports = {
    error, warn, info, verbose, debug, silly,
};
