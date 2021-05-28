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

    db.findUser(email, password);
})