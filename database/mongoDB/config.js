/*jshint node: true*/
'use strict';

/**
 * MongoDB urls
 */
const connectionURLs = {
    'development': {
      'v0': 'mongodb://localhost/craftKart'
    }
}

/**
 * MongoDB Collections
 */
const collections = {
  users: 'users',
  products: 'products'
}

module.exports = {
  connection: connectionURLs,
  collections: collections
}
