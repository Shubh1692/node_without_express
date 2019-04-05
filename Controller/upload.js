(function () {
    'use strict';
    const CONFIG = require('../app.config'),
        multiparty = require('multiparty'),
        form = new multiparty.Form(),
        fs = require('fs'),
        csv = require('csv-parser');
    function _upload(req, res) {
        try {
            form.parse(req, function (err, fields, files) {
                console.log('files', files, fields)
                if (err) {
                    return _sendResponse(400, {
                        msg: CONFIG.ERROR_MESSAGE.DATABASE_ERROR,
                        error: error
                    }, res);
                }
                let documents = files.documents;
                for (let i = 0; i < documents.length; i++) {
                    let singleDoc = documents[i];
                    _readAndWriteFile(singleDoc, new Date().getTime() + singleDoc.originalFilename, res);
                }


            });
        } catch (error) {
            _sendResponse(400, {
                msg: CONFIG.ERROR_MESSAGE.DATABASE_ERROR,
                error: error
            }, res);
        };
    }

    function _readAndWriteFile(singleDoc, newPath, res) {
        let csvArr = [];
        fs.readFile(singleDoc.path, function (err, data) {
            if (err) {
                return _sendResponse(200, {
                    msg: 'Error in csv file'
                }, res);
            }
            fs.writeFile(newPath, data, function (err) {
                if (err) {
                    return _sendResponse(200, {
                        msg: 'Error in csv file'
                    }, res);
                }
                fs.createReadStream(newPath)
                    .pipe(csv())
                    .on('data', (row) => {
                        csvArr.push(row)
                    })
                    .on('end', () => {
                        _sendResponse(200, {
                            msg: 'Error in csv file',
                            csvArr
                        }, res);
                    });
            })
        })
    }

    function _sendResponse(status, json, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(json));
        res.end();
    }
    module.exports = {
        upload: _upload
    }
})();
