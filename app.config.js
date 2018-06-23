(function () {
    'use strict';
    module.exports = {
        SERVER_CONFIG: {
            PORT: 3000,
            DATABASE_NAME: 'test_db'
        },
        ERROR_MESSAGE: {
            DATABASE_ERROR: 'Error by database',
            NO_API_EXIST: 'Not found',
            INVALID_CONTENT_TYPE: 'These api use application-json content type',
            UNSPPORTED_METHOD_TYPE: 'Unsupported method type (Use only GET, POST, PUT and DELETE)',
            INVALID_DATA_FOR_SAVE: 'Please provide json data for save user information',
            NO_DATA_FOR_SAVE: 'Please provide a object with at least one property'
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