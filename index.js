const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const db = require('./db');
const team = require('./team');

app.get('/', (req, res) => res.send(db))
app.get('/teams', (req, res) => res.send(team))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))