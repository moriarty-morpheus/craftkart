/*jshint node: true */
"use strict";
/**
 * Import Required Node Modules
 */
const Q = require('q');
/**
 * Import Required Project Modules
 */
const actionsStore = require('../../../database/store').actionsStore;
const responses = require('../../utility/store').responseStore;
/**
 * Authentication controller
 */
const controller = {};

controller.register = function(req, res, next) {
    let Users = new actionsStore.Users('v0');
    let userNamePromise = Users.checkUserName(req.body);
    let emailPromise = Users.checkEmail(req.body);
    Q.all([userNamePromise, emailPromise]).then(function(validations) {
        if (validations[0].code === 200 || validations[1].code === 200) {
            let response = responses.get(409);
            if (validations[0].code !== 200) {
                response.message = 'Oops! This Email Already Exists';
                return res.status(409).send(response);
            } else if (validations[1].code !== 200) {
                response.message = 'Oops! This Username Already Exists';
                return res.status(409).send(response);
            } else {
                response.message = 'Oops! This Username and Email Already Exist';
                return res.status(409).send(response);
            }
        } else {
            let createUserPromise = Users.createUser(req.body);
            createUserPromise.then(function(result) {
                let response = responses.get(201);
                response.message = 'Hey! Your Account Is Created Successfully';
                res.status(201).send(response);
            }, function(error) {
                return res.status(500).send(error);
            });
        }
    }, function(error) {
        return res.status(500).send(error);
    });
}

module.exports = controller;
