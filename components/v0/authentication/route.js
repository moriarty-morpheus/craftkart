/*jshint node: true*/
'use strict';
/**
 *  Create auth router instance
 */
const express = require('express');
const authRouter = express.Router();
const authController = require('./controller');

authRouter.post('/register', authController.register);

module.exports = authRouter;
