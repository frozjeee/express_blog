const controller = require('../controllers/postController');
const authController = require('../controllers/authController');
const validations = require('../config/validations');
const auth = require('./auth');

module.exports = (router, conn, redisCli) => {
    router.get('/', controller(conn).postsList);
    router.post('/create', authController(conn).authToken, controller(conn).postCreate);
    router.get('/:slug', controller(conn).postSlug);
};
