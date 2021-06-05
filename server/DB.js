const pg = require('pg');
const config = require('./secret');

const pgsql = new pg.Client(config.config);

let rows;

pgsql.connect(err => {
    if(err) throw err;
})

function queryDatabase(){
    const query = `
        select * from test;
    `;

    pgsql.query(query)
    .then(res => {
        const rows = res.rows;

        rows.map(row => {
            console.log(`Read: ${JSON.stringify(row)}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

async function findUser(email, password){
    const query = `
        select * from student where email = '${email}' and password = '${password}';
    `
    // let rows;
    // console.log(query);
    await pgsql.query(query)
    .then(res => {
        rows = res.rows;
        
        rows.map(row => {
            console.log(`Read: ${JSON.stringify(row)}`);
        });
    })
    .catch(err => {
        console.log(err);
    })

    return rows;
}

async function insertUser(email, password, name){
    const query = `
        insert into userInfo values ('${email}', '${password}', '${name}');
    `

    await pgsql.query(query)
    .catch(err => {
        console.log("err: " + err);
    })
}

async function insertBoard(title, content, reward, deadLine, status){
    const query = `
        insert into simpleBoard values(null, '${title}', '${content}', ${reward}, '${deadLine}', ${status});
    `

    await pgsql.query(query)
    .catch(err =>{
        console.log("err" + err);
    })
}

async function getBoard(status){
    const query = `
        select * from simpleBoard where status = ${status};
    `

    await pgsql.query(query)
    .then(res => {
        rows = res.rows;
        
    }).catch(err => {
        console.log(err);
    })

 
    return rows;

}

async function deleteBoardByTime(deadline){
    const query = `
        delete from simpleBoard where deadLine = '${deadline}';
    `

    await pgsql.query(query)
    .catch(err => {
        console.log(err);
    })
}

async function setUser(email, name, password, sid){
    temp = await isPass(sid);

    if(!temp)
        return false;

    const query = `
        update student set email = '${email}', name = '${name}', password = '${password}' where sid = ${sid}; 
    `

    await pgsql.query(query)
    .catch(err => {
        console.log("ERROR: " + err);
    })

    return true;
}

async function isPass(sid){
    const query = `
        select * from student where sid = ${sid};
    `

    result = await pgsql.query(query)
    .catch(err => {
        console.log("ERROR: " + err);
    })

    if(result.rows.length != 0)
        return true;
    else
        return false;
}

module.exports = {
    pgsql, queryDatabase, findUser, insertUser, insertBoard, getBoard, deleteBoardByTime, setUser
}