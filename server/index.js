require('date-utils');
const express = require('express');
const app = express()
const port = 8000
const db = require('./DB');
const bodyParser = require('body-parser');

const cors = require('cors');
const {spawn} = require('child_process');
// const tlqkf = require('python-shell')
// const python = spawn('python', ['./predict.py',201621021,3.5,'Gunpo',6,1]);

// python.stdout.on('data', function(data){
//     console.log(data.toString('utf-8'));
// })


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send("Hello World!");
})

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

app.get('/api/get', async (req, res) => {
    const rows = await db.getBoard();
    for(var i in rows){
        var date = new Date(rows[i].deadline).toLocaleString();
        var now = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        if(date == now){
            await db.deleteBoardByTime(rows[i].deadline);
        }
    }
    res.send(rows);
})

var id = [];
for(var i=0; i<4; i++){
    for(var j=1; j<51; j++){
        id.push(201800000+100000*i+j)
    }
}

for(var i=0; i<id.length; i++){
    const query = `
        insert into student values (${id[i]}, null, null, null, null, null, null);
    `

    db.pgsql.query(query)
    .catch(err => {
        console.log("err: " + err);
    })
}
// async function insertUser(email, password, name){
//     const query = `
//         insert into userInfo values ('${email}', '${password}', '${name}');
//     `

//     await pgsql.query(query)
//     .catch(err => {
//         console.log("err: " + err);
//     })
// }
console.log(id.length);
