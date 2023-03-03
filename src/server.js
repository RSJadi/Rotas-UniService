const mysql =  require('mysql')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conn = require('./database/db')
const port = 3001

const routes = require('./routes');

const server = express()
server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}));

server.use('/api', routes);

server.listen(port, () =>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
})