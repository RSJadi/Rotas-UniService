const db = require('../database/db');
produ
module.exports = {
    buscarTodos: ()=>{
        return new Promise((aceito, rejeitado)=> {
            db.query('SELECT * FROM instituicao', (error, results)=>{
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

            db.query('SELECT * FROM instituicao WHERE id = ?', [id], (error, results) => {
                if(error) {
                    rejeitado(error);
                    return;
                }
                if(results.length > 0){
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });      
        });
    },
    inserir: (cnpj, nome, razaoSocial, produtos, email, senha) => {
        return new Promise((aceito, rejeitado) => {         
            let query = 'INSERT INTO instituicao(cnpj, nome, razaoSocial, produtos, email, senha) VALUES (?, ?, ?, ?, ?);';
            db.query(query, [cnpj, nome, razaoSocial, produtos, email, senha], (error, results)=>{
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results.insertId);
            });
        });
    },
    alterar: (id, cnpj, nome, razaoSocial, produtos, email, senha) =>{
        return new Promise((aceito, rejeitado)=>{
            let query = 'UPDATE instituicao SET cnpj = ?, nome = ?, razaoSocial = ?, produtos = ?, email = ?, senha = ? WHERE id = ?;'
            db.query(query, [cnpj, nome, razaoSocial, produtos, email, id, senha], (error, results)=>{
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
            db.query('DELETE FROM instituicao WHERE id = ?;', [id], (error, results)=>{
               if(error){
                rejeitado(error);
                return;
               } 
               aceito(results);
            });
        })
    }
};