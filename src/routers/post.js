const router = require('express').Router();

const path = '/api/post';

module.exports = (app, conn) => {
    require('../routes/post')(router, conn);
    app.use(path, router);
}
