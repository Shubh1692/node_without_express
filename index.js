(function () {
    'use strict';
    const http = require('http');
    const CONFIG = require('./app.config');
    const server = http.createServer().listen(CONFIG.SERVER_CONFIG.PORT, function (params) {
        console.log('server start', CONFIG.SERVER_CONFIG.PORT)
    });
    const url = require('url');
    const userController = require('./Controller/user');
    const uploadController = require('./Controller/upload');
    server.on('request', function (req, res) {
        const srvUrl = url.parse(`http://${req.url}`);
        if (req.headers['content-type'] === 'application/json') {
            if (req.method == 'POST') {
                let body = '';
                req.on('data', function (data) { body += data; });
                req.on('end', function () {
                    body = JSON.parse(body);
                    if ((srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                        userController.creatUser(body, res);
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            "msg": CONFIG.ERROR_MESSAGE.NO_API_EXIST
                        }));
                        res.end();
                    }
                });

            } else if (req.method == 'GET') {
                req.on('data', function (data) { });
                req.on('end', function () {
                    let uuid = srvUrl.query ? srvUrl.query.split('uuid=')[srvUrl.query.split('uuid=').length - 1] : '';
                    if ((srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                        userController.getUsers(uuid, res);
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            "msg": CONFIG.ERROR_MESSAGE.NO_API_EXIST
                        }));
                        res.end();
                    }
                });
            } else if (req.method == 'PUT') {
                let body = '';
                req.on('data', function (data) { body += data; });
                req.on('end', function () {
                    body = JSON.parse(body);
                    let uuid = srvUrl.query ? srvUrl.query.split('uuid=')[srvUrl.query.split('uuid=').length - 1] : '';
                    if (uuid && (srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                        userController.updatetUser(uuid, body, res);
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            "msg": CONFIG.ERROR_MESSAGE.NO_API_EXIST
                        }));
                        res.end();
                    }
                });
            } else if (req.method == 'DELETE') {
                let body = '';
                req.on('data', function (data) { body += data; });
                req.on('end', function () {
                    body = JSON.parse(body);
                    let uuid = srvUrl.query ? srvUrl.query.split('uuid=')[srvUrl.query.split('uuid=').length - 1] : '';
                    if (uuid && (srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                        userController.deleteUser(uuid, body, res);
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            "msg": CONFIG.ERROR_MESSAGE.NO_API_EXIST
                        }));
                        res.end();
                    }
                });
            } else
                res.end();
        } else if (req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') > -1) {
            const srvUrl = url.parse(`http://${req.url}`);
            if (req.method == 'POST') {
                if ((srvUrl.pathname.indexOf('/upload') === 0 || srvUrl.pathname.indexOf('/upload/') === 0)) {
                    uploadController.upload(req, res);
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify({
                        "msg": CONFIG.ERROR_MESSAGE.NO_API_EXIST
                    }));
                    res.end();
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({
                    "msg": CONFIG.ERROR_MESSAGE.NO_API_EXIST
                }));
                res.end();
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                "msg": CONFIG.ERROR_MESSAGE.NO_API_EXIST
            }));
            res.end();
        }
    });
})();