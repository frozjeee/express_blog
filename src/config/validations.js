const { check, validationResult } = require('express-validator');
const badWords = ["pussy", "dick", "penis"];


module.exports = {
    validateRequest(req, res) {
        const errors = validationResult(req);
        const customErrors = req.errors;
        if (!errors.isEmpty() || req.validationError) {
            res.json({...errors ? errors.array() : null, ...customErrors });
            return true;
          }
        return false;
        },
        
    registerValidation: [
        check("name", "Your name must contain more than 3 characters and not contain bad words")
        .isString()
        .not().isIn(badWords)
        .isLength({min: 3, max: 16})
    ],
}
