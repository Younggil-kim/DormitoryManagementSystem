const express = require('express');
// const pg = require('pg');
const app = express()
const port = 8000
const db = require('./DB');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening Port ${port}`));

app.post('/api/users/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if(db.findUser(email, password)){
        return res.json({
            loginSuccess: true,
            message: "로그인 성공"
        })
    }else{
        return res.json({
            loginSuccess: false,
            message: "로그인 실패"
        })
    }
})

app.post('/api/users/register', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.name);
    db.insertUser(req.body.email, req.body.password, req.body.name)

    return res.json({

        success: true
    })

})