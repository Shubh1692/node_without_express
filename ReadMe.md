# Installation
    -   npm install
        -   server will be run on http://localhost:3000
# Update Configuration
    -   Add or update server configuration at /app.config.js
        -   Database name
        -   server running port number
        =   Error & success message
# Api
## User Apis
    -   post http://localhost:3000/user
    -   put http://localhost:3000/user?uuid=a85a21f9-3299-4979-852d-4d3c63495861
    -   delete http://localhost:3000/user?uuid=a85a21f9-3299-4979-852d-4d3c63495861
    -   get http://localhost:3000/user (all user in data base)
    -   get http://localhost:3000/user?uuid=a85a21f9-3299-4979-852d-4d3c63495861 (user by id)

## upload api
    -   post http://localhost:3000/upload
    input form-data
        key : documents
        value: csv file