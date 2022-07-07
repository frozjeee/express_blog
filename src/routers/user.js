const router = require('express').Router();

const path = '/api/user';



module.exports = (app, conn) => {
    require('../routes/user')(router, conn);
    app.use(path, router);
}