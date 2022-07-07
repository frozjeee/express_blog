const User = require("../entity/User");
const validations = require('../config/validations');


module.exports = (conn) => {
    return {
    userCreate: async function(req, res) {
        try {
            if (validations.validateRequest(req, res)) return;
            const userRepository = conn.getRepository(User);
            const userExists = await userRepository.findOne(req.body);
            if(userExists) {
                res.json({message: "user already exists"});
                return;
            }
            const user = await userRepository.create(req.body);
            const results = await userRepository.save(user);
            res.json(user);
        } catch (err) {
            res.json({message: err});
        }
    },
    usersList: async function(req, res) {
        try {
            const userRepository = conn.getRepository(User);
            const users = await userRepository.find();
            res.json(users);
        } catch (err) {
            res.json({ message: err });
        }
    }
       
    }
}