/*jshint node: true*/
'use strict';

/**
 * Import node modules
 */
const mongoose = require('mongoose');

/**
 * Import porject modules
 */
const crypter = require('../../../../components/utility/crypter');
const rootSchema = require('./rootSchema');
const config = require('config');
const collections = config.get('mongoConfig').collections;

/**
 * Adding additional fields to userSchema
 */
const userSchema = rootSchema.getRootSchema();
userSchema.add({
    firstName: {type: String, match: /[a-zA-Z]+/, required: false},
    lastName: {type: String, match: /[a-zA-Z]+/, required: false},
    userName: {type: String, match: /[a-zA-Z0-9]+/, required: true},
    email: {
        type: String,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        required: true
    },
    hashedPassword: {type: String, required: true},
    country: {type: String, required: false},
    profilePic: {type: String, required: false},
    userPic: {type: String, required: false},
    accessType: {type: String, required: false}
});

/**
 * Adding required setters and getters to the model
 */
userSchema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
      return this._plainPassword;
    });

/**
 * Adding methods to userSchema
 */

userSchema.methods.encryptPassword = function(password) {
    return crypter.encryptString(this.password);
}

userSchema.methods.verifyPassword = function(password) {
    return password === crypter.decryptString(this.hashPassword) ? true : false;
}

/**
 * Create Users Model
 */
const usersModel = mongoose.model(collections.users, userSchema);

module.exports = {
    usersModel: usersModel
}
