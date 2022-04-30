const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
}, { _id: false });

const locationSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: pointSchema, required: true },
    ascii: { type: String, required: true },
    alt_name: { type: String },
    feat_class: { type: String, required: true },
    feat_code: { type: String, required: true },
    country: { type: String, required: true },
    cc2: { type: String },
    admin1: { type: String },
    admin2: { type: String },
    admin3: { type: String },
    admin4: { type: String },
    population: { type: Number },
    elevation: { type: String },
    dem: { type: Number },
    tz: { type: String, required: true },
    modified_at: { type: Date, required: true },
}, { timestamps: true });

locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('locations', locationSchema);

module.exports = Location;
