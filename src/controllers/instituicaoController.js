const instituicaoService = require('../services/instituicaoService');

module.exports = {
    buscarTodos: async (req, res)=>{
        let json = {error: '', result: []};

        let intituicao = await instituicaoService.buscarTodos();

        for (let i in intituicao) {
            json.result.push({
                id: intituicao[i].id,
                cnpj: intituicao[i].cnpj,
                razaoSocial: intituicao[i].razaoSocial,
                nome: intituicao[i].nome,
                senha: senha[i].senha
            });  
        }
        res.json(json);
    },
    buscarUm: async(req, res)=>{
        let json = {error: '', result: null};

        let id = req.params.id;
        let intituicao = await instituicaoService.buscarUm(id);

        if (intituicao){
            json.result = intituicao;
            res.json(json)
        } else {
            res.status(404).send({ result: null });
        }
    },
    inserir: async(req,res)=>{
        let json = { error: '', result: {}};

        let cnpj = req.body.cnpj;
        let razaoSocial = req.body.razaoSocial;
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

        if(cnpj && nome && razaoSocial && email && senha){ //!= null ?
            let intituicaoId = await instituicaoService.inserir(cnpj, nome, razaoSocial, email, senha);
            json.result = {
                id: intituicaoId,
                cnpj,
                razaoSocial,
                nome,
                email,
                senha
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res)=>{
        let json = { error: '', result: {}};

        let id = req.params.id;
        let cnpj = req.body.cnpj;
        let razaoSocial = req.body.razaoSocial;
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

        if(id && cnpj &&  nome && razaoSocial && email && senha){
            await instituicaoService.alterar(id, cnpj, nome, razaoSocial, email, senha);
            json.result = {
                id,
                cnpj,
                razaoSocial,
                nome,
                email, 
                senha
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },
    excluir: async(req, res)=>{
        let json = {error: '', result: {}};

        await instituicaoService.excluir(req.params.id);

        res.json(json);
    }
}