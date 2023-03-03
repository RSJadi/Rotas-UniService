const mysql = require('mysql');
const server = require('../server');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '123456',
    database: 'uniservice'
})

connection.connect((error)=> {
    if(error){
        console.log(error)
    } else {
        console.log('Conectado ao Banco de Dados com sucesso!')
    }
})

module.exports = connection;