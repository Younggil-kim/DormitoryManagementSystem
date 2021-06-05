const db = require('../DB');
const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;
    
    let sid;

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) throw err;
        sid = decoded;
    })

    const query = `
        select usrtoken from student where sid = ${sid};
    ` 

    db.pgsql.query(query)
    .then(response => {

        if(response.rows[0].usrtoken === token){
            req.sid = sid;
            req.token = token;
            next();
        }else{
            return res.json({isAuth: false, error: true})
        }
    })

    // db.findByToken(token, (err, rows) => {
    //     console.log(rows);
    // })

    // const rows = new Promise(async (resolve, reject) => {
    //     try{
    //         const request = await db.findByToken(token)
    //             .then(response => {response.data})

    //         resolve(request)
    //     }catch(err){
    //         console.log("여기 에러났어요 여러분")
    //         reject(new Error(err))
    //     }
    // })
    // rows.then((data) => {
    //     console.log("여기요",data)  
    // })
    
    
    // console.log(rows)

    // jwt.verify(token, 'secret', function(err, decoded){
    //     console.log();
    //     if(err) throw err;
    //     if(!rows[0].sid.equals(decoded)) res.json({isAuth: false, error: true});
    //     // req.token = token;
    //     req.body = rows[0];
    //     next();
    // })
}

module.exports = {auth};