require('date-utils');
const express = require('express');
const app = express()
const port = 8000
const db = require('./DB');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const cors = require('cors');
const {spawn} = require('child_process');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');
const { isBuffer } = require('util');
// const { response } = require('express');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.send("Hello World!");
})

app.listen(port, () => console.log(`listening Port ${port}`));

app.post('/api/users/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    const temp = await db.findUser(email, password);

    if(temp.length == 1){
        res.cookie("x_auth", temp[0].usrtoken)
        .status(200)
        .json({loginSuccess: true})
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
    // console.log(temp);
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

app.post('/api/insert', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const reward = req.body.rewardToken;
    const deadLine = req.body.deadLine;
    const status = req.body.status;

    let token = req.cookies.x_auth;
    let sid;

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) throw err;
        sid = decoded;
    })
    let index;
    query = `
        select max(index) from simpleboard;
    `
    await db.pgsql.query(query)
    .then(response => {
        index = response.rows[0].max
    })
    .catch(err => {
        console.log(err)
        return res.json({
            success: false
        })
    })

    query = `
        insert into simpleboard values (${sid}, '${title}', '${content}', ${reward},
         '${deadLine}', ${status}, ${index+1})
    `
    await db.pgsql.query(query)
    
    return res.json({
        success: true
    })
})

app.post('/api/tokenboard', async (req, res) => {
    // console.log(req.body.status)
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

app.get('/api/get/mystudentid', (req, res) => {
    let token = req.cookies.x_auth;
    let sid;
    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) throw err;
        sid = decoded;
    })
    res.send(sid);
})

app.post('/api/predict', async(req, res)=> {
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
let token;
app.get('/api/auth', auth, async (req, res) => {
    // console.log("일단 여기")
    const query = `
        select * from student where sid = ${req.sid}
    `

    rows = await db.pgsql.query(query)
    // console.log("tlqkf")
    // console.log(rows.rows[0])
    token = rows.rows[0].token
    res.status(200).json({
        sid: rows.rows[0].sid,
        name: rows.rows[0].name,
        email: rows.rows[0].email,
        password: rows.rows[0].password,
        token: rows.rows[0].token,
        dorm: rows.rows[0].dorm,
        room: rows.rows[0].room,
        usrtoken : rows.rows[0].usrtoken,
        isadmin : rows.rows[0].isadmin == null ? false : true,   
        isAuth: true
    })
})

app.get('/api/users/logout', auth, async (req, res) => {
    // console.log(req.sid);
    const query = `
        update student set usrtoken = null where sid = ${req.sid};
    `
    await db.pgsql.query(query)
    .catch(err => {
        return res.json({success: false, err})
    })

    return res.status(200).send({
        success: true
    })
})

app.get('/api/users/userinfo', auth,async(req, res) => {
    let token =  req.cookies.x_auth;
    // console.log(req.cookies.x_auth);
    const query = `
        select * from student where usrtoken = '${token}';
    `
    let user;
    await db.pgsql.query(query)
    .then(response => {
        // console.log(response)
        user = response.rows;
        // console.log(response.rows);
    })
    // console.log(user);
    res.send(user);
})

app.get('/api/get/student', async (req, res) => {
    let query = `
        select count(*) from student;
    `
    let count;
    await db.pgsql.query(query)
    .then(response => {
        count = response.rows[0].count;
    })

    if(count != 0){
        return res.json({
            success: false
        })
    }
    
    var id = [];
    for(var i=0; i<4; i++){
        for(var j=1; j<51; j++){
            id.push(201800000+100000*i+j)
        }
    }

    for(var i=0; i<id.length; i++){
        const query = `
            insert into student values (${id[i]}, null, null, null, 100, null, null);
        `

        db.pgsql.query(query)
    }

    return res.json({
        success: true
    })

})

app.post('/api/delete/', async (req, res) => {

    index = req.body.index
    let token = req.cookies.x_auth;
    let sid;
    let canDelete;
    let findQuery = `
        select sid from simpleboard where index = ${index}; 
    `
    
    await db.pgsql.query(findQuery)
    .then(response => {
        sid = response.rows[0].sid
    })

    jwt.verify(token, 'secret', (err, decoded) => {
        console.log(sid)
        console.log(decoded)
        if(err) throw err;
        if(decoded != sid){
            canDelete = false;
        }
        else{
            canDelete = true
        }
    })

    if(canDelete){
        let query = `
    delete from simpleboard where index = ${index};
    `   

    db.pgsql.query(query)
    .then(response => {
        return res.json({
            success: true
        })
    })
    .catch(err => {
        return res.json({
            success: false
        })
    })
    }

    return res.json({
        success: false
    })
    
})

