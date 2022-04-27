const error = (message, extra = undefined) => console.error(message, extra);

const warn = (message, extra = undefined) => console.warn(message, extra);

const info = (message, extra = undefined) => console.log(message, extra);

const verbose = (message, extra = undefined) => console.verbose(message, extra);

const debug = (message, extra = undefined) => console.debug(message, extra);

const silly = (message, extra = undefined) => console.debug(message, extra);

module.exports = {
    error, warn, info, verbose, debug, silly,
};
