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
        select * from userInfo where email = '${email}' and pw = '${password}';
    `
    // let rows;
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

async function getBoard(){
    const query = `
        select * from simpleBoard;
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

module.exports = {
    pgsql, queryDatabase, findUser, insertUser, insertBoard, getBoard, deleteBoardByTime
}