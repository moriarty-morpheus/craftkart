/*jshint node: true*/
'use strict';
const actionsStore = {
    Users: require('./mongoDB/actions/users').Users
}

module.exports = {
    actionsStore: actionsStore
};
