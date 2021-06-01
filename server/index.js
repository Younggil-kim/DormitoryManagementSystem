const express = require('express');
// const pg = require('pg');
const app = express()
const port = 8000
const db = require('./DB');
const bodyParser = require('body-parser');
// const { response } = require('express');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

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
    db.insertUser(req.body.email, req.body.password, req.body.name)

    return res.json({

        success: true
    })

})

app.post('/api/insert', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const token = req.body.rewardToken;

    console.log(title, content, req.body.rewardToken);

    if(db.insertBoard(title, content, token)){
        return res.json({
            success: true
        })
    }else{
        return res.json({
            success: false
        })
    }
})

app.get('/api/get', async (req, res) => {
    const rows = await db.getBoard();
    // console.log(rows);

    res.send(rows);
})