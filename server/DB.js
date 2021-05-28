const pg = require('pg');

const config = {
    user:'postgres',
    host:'localhost',
    database: 'SWEngineering',
    password: 'hcg1208*',
    port: '5433'
}

const pgsql = new pg.Client(config);

pgsql.connect(err => {
    if(err) throw err;
    // else{
    //     queryDatabase();
    // }
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

        // process.exit();
    })
    .catch(err => {
        console.log(err);
    });
}

function findUser(email, password){
    const query = `
        select * from userInfo where email = '${email}' and pw = '${password}';
    `

    pgsql.query(query)
    .then(res => {
        const rows = res.rows;

        if(rows.length == 0){
            console.log(0);
        }

        rows.map(row => {
            console.log(`Read: ${JSON.stringify(row)}`);
        });
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    pgsql, queryDatabase, findUser
}