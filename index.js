const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const db = require('./db');

app.get('/', (req, res) => res.send(db))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))