(function () {
    'use strict';
    const HTTP = require('http'),
        CONFIG = require('./app.config'),
        SERVER = HTTP.createServer().listen(CONFIG.SERVER_CONFIG.PORT, function () {
            console.log(`SERVER start on port ${CONFIG.SERVER_CONFIG.PORT}`);
        }),
        URL = require('url'),
        User = require('./Controller/user');

    SERVER.on('request', function (req, res) {
        const srvUrl = URL.parse(`http://${req.url}`);
        if (req.headers['content-type'] === 'application/json') {
            if (req.method == 'POST') {
                let body = '';
                req.on('data', function (data) { body += data; });
                req.on('end', function () {
                    if(!body) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            'msg': CONFIG.ERROR_MESSAGE.INVALID_DATA_FOR_SAVE
                        }));
                        res.end();
                        return;
                    }
                    try {
                        body = JSON.parse(body);
                        if (!Object.keys(body).length) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.write(JSON.stringify({
                                'msg': CONFIG.ERROR_MESSAGE.NO_DATA_FOR_SAVE
                            }));
                            res.end();
                            return;
                        }
                        if ((srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                            User.creatUser(body, res);
                        } else {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.write(JSON.stringify({
                                'msg': CONFIG.ERROR_MESSAGE.NO_API_EXIST
                            }));
                            res.end();
                        }
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            'msg': CONFIG.ERROR_MESSAGE.INVALID_DATA_FOR_SAVE
                        }));
                        res.end();
                        return;
                    }
                });

            } else if (req.method == 'GET') {
                req.on('data', function () { });
                req.on('end', function () {
                    const uuid = srvUrl.query ? srvUrl.query.split('uuid=')[srvUrl.query.split('uuid=').length - 1] : '';
                    if ((srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                        User.getUsers(uuid, res);
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            'msg': CONFIG.ERROR_MESSAGE.NO_API_EXIST
                        }));
                        res.end();
                    }
                });
            } else if (req.method == 'PUT') {
                let body = '';
                req.on('data', function (data) { body += data; });
                req.on('end', function () {
                    body = JSON.parse(body);
                    const uuid = srvUrl.query ? srvUrl.query.split('uuid=')[srvUrl.query.split('uuid=').length - 1] : '';
                    if (uuid && (srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                        User.updatetUser(uuid, body, res);
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            'msg': CONFIG.ERROR_MESSAGE.NO_API_EXIST
                        }));
                        res.end();
                    }
                });
            } else if (req.method == 'DELETE') {
                let body = '';
                req.on('data', function (data) { body += data; });
                req.on('end', function () {
                    body = JSON.parse(body);
                    const uuid = srvUrl.query ? srvUrl.query.split('uuid=')[srvUrl.query.split('uuid=').length - 1] : '';
                    if (uuid && (srvUrl.pathname.indexOf('/user') === 0 || srvUrl.pathname.indexOf('/user/') === 0)) {
                        User.deleteUser(uuid, body, res);
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify({
                            'msg': CONFIG.ERROR_MESSAGE.NO_API_EXIST
                        }));
                        res.end();
                    }
                });
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({
                    'msg': CONFIG.ERROR_MESSAGE.UNSPPORTED_METHOD_TYPE
                }));
                res.end();
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                'msg': CONFIG.ERROR_MESSAGE.INVALID_CONTENT_TYPE
            }));
            res.end();
        }
    });
})();