(function () {
    'use strict';
    module.exports = {
        SERVER_CONFIG: {
            PORT: 3000,
            DATABASE_NAME: 'netflix_db'
        },
        ERROR_MESSAGE: {
            DATABASE_ERROR: 'Error by data base',
            NO_API_EXIST: 'Not found'
        },
        SUCCESS_MESSAGE: {
            USER_API_SUCCESS: {
                CREATE_USER: 'User saved successfully',
                UPDATE_USER: 'User update successfully',
                DELETE_USER: 'User delete successfully',
                GET_USER: 'User list'
            }
        }
    }
})();