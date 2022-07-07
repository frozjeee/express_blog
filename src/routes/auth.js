const controller = require('../controllers/authController');
const validations = require('../config/validations');

module.exports = (router, conn, redisCli) => {
//   router.get('/', controller.auth, controller.checkAuth);
  router.post('/register', validations.registerValidation, controller(conn, redisCli).register);
  router.post('/login', controller(conn, redisCli).login);
//   router.post('/rights', validations.changeTypeValidation, controller.auth, controller.changeUserType);
  router.post('/token', controller(conn, redisCli).refreshToken);
};
