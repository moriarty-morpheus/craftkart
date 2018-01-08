/*jshint node: true*/
'use strict';

/**
 * Import porject modules
 */
const Q = require('q');
const responseStore = require('../../dbStore').responseStore;
/**
 * Creating Users Object
 */
function Users(version) {
    this.model = require('../models/' + version + '/users').usersModel;

    this.createUser = function(userObj) {
        let deferred = Q.defer();

        if (!userObj.userName) {
            let error = responseStore.get(422);
            error.msg = 'Invalid Username';
            deferred.reject(error);
            return deferred.promise;
        }

        if (!userObj.email) {
            let error = responseStore.get(422);
            error.msg = 'Invalid Email';
            deferred.reject(error);
            return deferred.promise;
        }

        let user = new this.model(userObj);
        user.save(function(err) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve({'msg': 'success'})
            }
        });
        return deferred.promise;
    }

    this.checkUserName = function(userObj) {
        let deferred = Q.defer();

        if (!userObj.userName) {
            let error = responseStore.get(422);
            error.msg = 'Invalid Username';
            deferred.reject(error);
            return deferred.promise;
        }
        this.model.findOne({'userName': userObj.userName}).then(function(foundUser) {
            if (!foundUser) {
                let response = responseStore.get(404);
                deferred.resolve(response);
            } else {
                let response = responseStore.get(200);
                response.data = foundUser;
                deferred.resolve(response);
            }
        }, function(err) {
            let error = responseStore.get(500);
            error.msg = 'Mongo Server Error';
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.checkEmail = function(userObj) {
        let deferred = Q.defer();

        if (!userObj.userName) {
            let error = responseStore.get(422);
            error.msg = 'Invalid Email';
            deferred.reject(error);
            return deferred.promise;
        }

        this.model.findOne({'email': userObj.email}).then(function(foundUser) {
            if (!foundUser) {
                let response = responseStore.get(404);
                deferred.resolve(response);
            } else {
                let response = responseStore.get(200);
                response.data = foundUser;
                deferred.resolve(response);
            }
        }, function(err) {
            let error = responseStore.get(500);
            error.msg = 'Mongo Server Error';
            deferred.reject(error);
        });
        return deferred.promise;
    }

    // this.verifyPassword = function(userObj) {
    //     let deferred = Q.defer();
    //
    //     if (!userObj.userName) {
    //         let error = constants.mongoError;
    //         error.code = 422;
    //         error.msg = 'Invalid Username';
    //         deferred.reject(error);
    //         return deferred.promise;
    //     }
    //
    //     if (!userObj.password) {
    //         let error = constants.mongoError;
    //         error.code = 422;
    //         error.msg = 'Invalid Username';
    //         deferred.reject(error);
    //         return deferred.promise;
    //     }
    //
    //     User.verifyPassword()
    //     return deferred.promise;
    // }

};

module.exports = {
    Users: Users
}
