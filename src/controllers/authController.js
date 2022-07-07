const User = require("../entity/User");
const jwt = require('jsonwebtoken');
require('dotenv/config');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  }

module.exports = (conn, redisCli) => {
    return {
    async register(req, res) {
        try {
            if (validations.validateRequest(req, res)) return;
            const userRepository = conn.getRepository(User);
            const userExists = await userRepository.findOne(req.body);
            if(userExists) {
                res.json({message: "user already exists"});
                return;
            }
            const user = await userRepository.create(req.body);
            const access_token = await userRepository.save(user);
            res.json({ access_token: access_token });
        } catch (err) {
            res.json({message: err});
        }
    },

    async login(req, res) {
        try {
            const userRepository = conn.getRepository(User);
            const userExists = await userRepository.findOne({
                name: req.body.name,
                password: req.body.password
            });
            if (!userExists) {
                res.json({message: "user not found"});
                return;
            }

            if (req.body.password != userExists.password) {
                res.json({message: "wrong password"});
                return;
            }
            const user = { name: req.body.name };
            const access_token = generateAccessToken(user);
            const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            redisCli.setex(user["name"], 60, refresh_token);
            res.json({access_token: access_token, refresh_token: refresh_token});

        } catch (err) {
            res.json({message: err});
        }
    },
   

    authToken(req, res, next) {
        const auth_header = req.headers['authorization'];
        const token = auth_header && auth_header.split(" ")[1];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    },
    
    refreshToken(req, res) {
        const refToken = req.body.token;
        if (refToken == null) return res.sendStatus(401); 

        jwt.verify(refToken , process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            redisCli.get(user["name"], (err, data) => {
                if (err) return res.sendStatus(403);
                if (data != refToken) return res.sendStatus(403);
                if (data == null) return res.sendStatus(403);
                const accessToken = generateAccessToken({name: user.name});
                res.json({ accessToken: accessToken });
        })
            
        })
    },

};

}

