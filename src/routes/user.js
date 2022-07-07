const controller = require('../controllers/userController');
const validations = require('../config/validations');
const authController = require('../controllers/authController');

module.exports = (router, conn) => {
    router.get('/', authController(conn).authToken, controller(conn).usersList);
    router.post('/create', validations.registerValidation, controller(conn).userCreate);
}

