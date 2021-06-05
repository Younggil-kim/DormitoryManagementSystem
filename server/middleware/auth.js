const db = require('../DB');
const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    let rows = db.findByToken(token);

    jwt.verify(token, 'secret', function(err, decoded){
        if(err) throw err;
        if(rows[0].sid != decoded) res.json({isAuth: false, error: true});
        // req.token = token;
        req.body = rows[0];
    })
}

module.exports = {auth}