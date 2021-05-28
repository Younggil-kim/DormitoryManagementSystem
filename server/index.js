const express = require('express');
// const pg = require('pg');
const app = express()
const port = 8000
const db = require('./DB');


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening Port ${port}`));

