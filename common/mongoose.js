const mongoose = require('mongoose');
const health = require('./health');
const { MONGO_DB_URI, MONGOOSE_DEBUGER } = require('../config');

const connectMongoose = async () => {
    try {
        mongoose.set('debug', MONGOOSE_DEBUGER === 'true');
        mongoose.Promise = Promise;

        mongoose.connection.on('error', (err) => health.reportError('MongoDBError', err));
        mongoose.connection.on('disconnected', () => health.reportError('MongoDBError', new Error('MongoDB is disconnected')));

        await mongoose.connect(MONGO_DB_URI);
    } catch (error) {
        health.reportError('MongoDBError', error);
    }
};

module.exports = { connectMongoose };
