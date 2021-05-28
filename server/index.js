const express = require('express');
const app = express()
const port = 8000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening Port ${port}`));

console.log('hello');