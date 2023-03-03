const db = require('../database/db');

module.exports = {
    buscarTodos: ()=>{
        return new Promise((aceito, rejeitado)=> {
            db.query('SELECT * FROM servicos', (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                };
                aceito(results);
            });
        })
    },
    buscarUm: (id) =>{
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM servicos WHERE id = ?', [id], (error, results) => {
                if(error) {
                    rejeitado(error);
                    return
                }
                if(results.length > 0){
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });      
        });
    },
    inserir: (nome, requisitos, valor, formas_pagamento) => {
        return new Promise((aceito, rejeitado) => {         
            let query = 'INSERT INTO servicos (nome, requisitos, valor, formas_pagamento) VALUES (?, ?, ?, ?);';
            db.query(query, [nome, requisitos, valor, formas_pagamento], (error, results)=>{
                if (error) {
                    rejeitado(null);
                    return;
                }
                aceito(results.insertId);
            });
        });
    },
    alterar: (id, nome, requisitos, valor, formas_pagamento) =>{
        return new Promise((aceito, rejeitado)=>{
            let query = 'UPDATE servicos SET nome = ?, requisitos = ?, valor = ?, formas_pagamento = ? WHERE id = ?;'
            db.query(query, [nome, requisitos, valor, formas_pagamento, id], (error, results) => {
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results);
            })
        });
    },
    excluir:(id)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM servicos WHERE id = ?;', [id], (error, results)=>{
               if(error){
                rejeitado(error);
                return;
               } 
               aceito(results);
            });
        })
    }
};