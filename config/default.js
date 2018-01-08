/*jshint node: true*/
'use strict';

/**
 * MongoDB Config
 */
const mongoConfig = {
    collections: {
        users: 'users',
        products: 'products'
    },
    connections: {
        development: {
            v0: 'mongodb://localhost/craftKart'
        }
    }
}

/**
 * APIs Config
 */
const apiConfig = {
    apiVersions: [0]
}

module.exports = {
    mongoConfig: mongoConfig,
    apiConfig: apiConfig
}
