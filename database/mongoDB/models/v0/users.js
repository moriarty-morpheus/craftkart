/*jshint node: true*/
'use strict';

/**
 * Import node modules
 */
const mongoose = require('mongoose');

/**
 * Import porject modules
 */
const crypter = require('../../../components/utility/crypter');
const rootSchema = require('../rootSchema');

/**
 * Adding additional fields to userSchema
 */
const userSchema = rootSchema.getRootSchema();
userSchema.add({
  firstName: {type: String, match: /[a-zA-Z]+/, required: false},
  lastName: {type: String, match: /[a-zA-Z]+/, required: false},
  username: {type: String, match: /[a-zA-Z0-9]+/, required: true},
  email: {
    type: String,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    required: true
  },
  hashedPassword: {type: String, required: true},
  country: {type: String, required: false},
  profilePic: {type: String, required: false},
  userPic: {type: String, required: false},
  accessType: {type: String, required: true}
});

userSchema.methods.hashPassword = function(password) {
  return crypter.encryptString(password);
}

userSchema.methods.verifyPassword = function(password) {
  return password === crypter.decryptString(this.hashPassword) ? true : false;
}
