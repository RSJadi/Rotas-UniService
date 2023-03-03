const db = require('../database/db');

module.exports = {
    buscarTodos: ()=>{
        return new Promise((aceito, rejeitado)=> {
            db.query('SELECT * FROM fornecedores', (error, results)=>{
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

            db.query('SELECT * FROM fornecedores WHERE id = ?', [id], (error, results) => {
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
    inserir: async (cnpj, nome, produtos) => {
        return new Promise((aceito, rejeitado) => {         
            let query = 'INSERT INTO fornecedores(cnpj, nome, produtos) VALUES (?, ?, ?);';
            db.query(query, [cnpj, nome, produtos], (error, results)=>{
                if (error) {
                    rejeitado(null);
                    return;
                }
                aceito(results.insertId);
            });
        });
    },
    alterar: (id, cnpj, nome, produtos) =>{
        return new Promise((aceito, rejeitado)=>{
            let query = 'UPDATE fornecedores SET cnpj = ?, nome = ?, produtos = ? WHERE id = ?;'
            db.query(query, [cnpj, nome, produtos, id], (error, results)=>{
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
            db.query('DELETE FROM fornecedores WHERE id = ?;', [id], (error, results)=>{
               if(error){
                rejeitado(error);
                return;
               } 
               aceito(results);
            });
        })
    }
};