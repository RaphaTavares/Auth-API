const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');

const requireAuth = (req, res, next) =>{
    const token = req.body.token;
    
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.status(401).json({error: err.message});
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.status(401).json({error: 'no token'});
    }
}

module.exports = { requireAuth };