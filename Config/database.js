(() => {
    'use strict';
    const JsonDB = require('node-json-db'),
        CONFIG = require('../app.config');
    module.exports = {
        db: new JsonDB(CONFIG.SERVER_CONFIG.DATABASE_NAME, true, true)
    }
})();