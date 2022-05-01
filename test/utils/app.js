const chai = require('./chai');
const { app } = require('../../app');

const request = chai.request(app.app).keepOpen();

module.exports = { request };
