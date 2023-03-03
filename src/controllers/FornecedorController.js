const FornecedorService = require('../services/FornecedorService');

module.exports = {
    buscarTodos: async (req, res)=>{
        let json = {error: '', result: []};

        let fornecedores = await FornecedorService.buscarTodos();

        for (let i in fornecedores) {
            json.result.push({
                id: fornecedores[i].id,
                cnpj: fornecedores[i].cnpj,
                nome: fornecedores[i].nome,
                produtos: fornecedores[i].produtos
            });  
        }
        res.json(json);
    },
    buscarUm: async(req, res)=>{
        let json = {error: '', result: null};

        let id = req.params.id;
        let fornecedor = await FornecedorService.buscarUm(id);

        if (fornecedor){
            json.result = fornecedor;
            res.json(json)
        } else {
            res.status(404).send({ result: null })
        }
    },
    inserir: async(req,res)=>{
        let json = { error: '', result: {}};

        let cnpj = req.body.cnpj;
        let nome = req.body.nome;
        let produtos = req.body.produtos;

        if(cnpj && nome && produtos){ //!= null ?
            let fornecedorId = await FornecedorService.inserir(cnpj, nome, produtos);
            json.result = {
                id: fornecedorId,
                cnpj,
                nome,
                produtos
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res)=>{
        let json = { error: '', result: {}};

        let id = req.params.id
        let cnpj = req.body.cnpj;
        let nome = req.body.nome;
        let produtos = req.body.produtos;

        if(id && cnpj && nome && produtos){
            await FornecedorService.alterar(id, cnpj, nome, produtos);
            json.result = {
                id,
                cnpj,
                nome,
                produtos
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },
    excluir: async(req, res)=>{
        let json = {error: '', result: {}};
        await FornecedorService.excluir(req.params.id);

        res.json(json);
    }
}