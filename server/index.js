require('date-utils');
const express = require('express');
const app = express()
const port = 8000
const db = require('./DB');
const bodyParser = require('body-parser');

const cors = require('cors');
const {spawn} = require('child_process');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send("Hello World!");
})

app.listen(port, () => console.log(`listening Port ${port}`));

app.post('/api/users/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    const temp = await db.findUser(email, password);
    
    if(temp.length == 1){
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

app.post('/api/users/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sid = parseInt(req.body.sid);
    const name = req.body.name;


    const temp = await db.setUser(email, name, password, sid);
    console.log(temp);
    if(temp){
        return res.json({
            success: true
        })
    }
    else{
        return res.json({
            success: false
        })
    }

})

app.post('/api/insert', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const reward = req.body.rewardToken;
    const deadLine = req.body.deadLine;
    // deadLine = deadLine.replace("T", " ");
    // var date, time = deadLine.split(" ");
    // console.log(date, time);
    const status = req.body.status;

    if(db.insertBoard(title, content, reward, deadLine, status)){
        return res.json({
            success: true
        })
    }else{
        return res.json({
            success: false
        })
    }
})

app.post('/api/tokenboard', async (req, res) => {
    console.log(req.body.status)
    const status = req.body.status
    const rows = await db.getBoard(status);
    for(var i in rows){
        var date = new Date(rows[i].deadline).toLocaleString();
        var now = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        if(date == now){
            await db.deleteBoardByTime(rows[i].deadline);
        }
    }
    res.send(rows);
})

app.post('/predict', async(req, res)=> {
    // console.log('hello')
    const sid = req.body.sid;
    const gpa = req.body.gpa;
    const area = req.body.area;
    const service = req.body.service;
    const dorm = req.body.dorm;
    // console.log(sid)
    // console.log(gpa)
    // console.log(area)
    // console.log(service)
    // console.log(dorm)

    console.log("Execting python file...")

    const python = spawn('python', ['./predict.py',sid, gpa, area, service, dorm]);

    python.stdout.on('data', function(data){
        var lst = data.toString('utf-8').replace("\r\n", "").split(" ");
        console.log(lst);
        res.json({
            dorm: lst[0],
            percent: lst[1],
            score: lst[2]
        });
    })
})