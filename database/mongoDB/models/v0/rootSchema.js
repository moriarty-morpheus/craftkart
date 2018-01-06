/*jshint node: true*/
'use strict';

/**
 * Import node modules
 */
const mongoose = require('mongoose');
const config = require('../config');
const dbEnv = process.env.MONGO_ENV;
const url = config.connection[]
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testingMongo', {
  useMongoClient: true
});
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Schema constructor
 */
const Schema = mongoose.Schema;

/**
 * Root Schema
 */
const rootSchema = {
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDates: {
        type: [Date],
        default: null
    },
    deletedDates: {
        type: [Date],
        default: null
    }
}

const getRootSchema = function() {
    const mongooseRootSchema = new mongoose.Schema(rootSchema);
    mongooseRootSchema.plugin(uniqueValidator);
    return mongooseRootSchema;
}

module.exports = {
  getRootSchema: getRootSchema
}
