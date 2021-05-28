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
    else{
        queryDatabase();
    }
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

module.exports = {
    pgsql
}