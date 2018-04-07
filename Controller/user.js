(function () {
    'use strict';
    const netflix_db = require('../Config/database');
    const uuidv4 = require('uuid/v4');
    const CONFIG = require('../app.config');
    function _creatUser(user, res) {
        user.uuid = uuidv4();
        try {
            netflix_db.db.push("/users/" + user.uuid, user, true);
            _sendResponse(200, {
                msg: CONFIG.SUCCESS_MESSAGE.USER_API_SUCCESS.CREATE_USER,
                user: user
            }, res);
        } catch (error) {
            _sendResponse(400, {
                msg: CONFIG.ERROR_MESSAGE.DATABASE_ERROR,
                error: error
            }, res);
        };


    }

    function _updateUser(user_id, user, res) {
        try {
            netflix_db.db.push("/users/" + user_id, user, true);
            _sendResponse(200, {
                msg: CONFIG.SUCCESS_MESSAGE.USER_API_SUCCESS.UPDATE_USER,
                user: user
            }, res);
        } catch (error) {
            _sendResponse(400, {
                msg: CONFIG.ERROR_MESSAGE.DATABASE_ERROR,
                error: error
            }, res);
        };
    }

    function _deleteUser(user_id, user, res) {
        try {
            netflix_db.db.delete("/users/" + user_id, user, true);
            _sendResponse(200, {
                msg: CONFIG.SUCCESS_MESSAGE.USER_API_SUCCESS.DELETE_USER,
                user_id: user_id
            }, res);
        } catch (error) {
            _sendResponse(400, {
                msg: CONFIG.ERROR_MESSAGE.DATABASE_ERROR,
                error: error
            }, res);
        };
    }


    function _getUsers(user_id, res) {
        let users = {};
        let users_path = "/users" + (user_id ? '/' + user_id : '');
        try {
            users = netflix_db.db.getData(users_path);
            _sendResponse(200, {
                msg: CONFIG.SUCCESS_MESSAGE.USER_API_SUCCESS.GET_USER,
                users: users
            }, res);
        } catch (error) {
            _sendResponse(400, {
                msg: CONFIG.ERROR_MESSAGE.DATABASE_ERROR,
                error: error
            }, res);
        };
    }


    function _sendResponse(status, json, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(json));
        res.end();
    }
    module.exports = {
        creatUser: _creatUser,
        updatetUser: _updateUser,
        deleteUser: _deleteUser,
        getUsers: _getUsers
    }
})();
