const ServicoService = require("../services/ServicoService");

module.exports = {
    buscarTodos: async (req, res)=>{
        let json = {error: '', result: []};

        let servicos = await ServicoService.buscarTodos();

        json.result = servicos.map(item => ({
            id: item.id,
            nome: item.nome,
            requisitos: item.requisitos,
            valor: item.valor,
            formas_pagamento: item.formas_pagamento,
        }))

        res.json(json);
    },
    buscarUm: async(req, res)=>{
        const json = {error: '', result: null};

        const id = req.params.id;
        const servico = await ServicoService.buscarUm(id);

        if (servico){
            json.result = servico;
            res.json(json)
        } else {
            res.status(404).send({ result: null })
        }
    },
    inserir: async(req,res)=>{
        let json = { error: '', result: {}};

        let nome = req.body.nome
        let requisitos = req.body.requisitos
        let valor = req.body.valor
        let formas_pagamento = req.body.formas_pagamento

        if (nome && requisitos && valor && formas_pagamento) { //!= null ?
            let servicoId = await ServicoService.inserir(nome, requisitos, valor, formas_pagamento);
            json.result = {
                id: servicoId,
                nome,
                requisitos,
                valor,
                formas_pagamento
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res)=>{
        let json = { error: '', result: {}};

        let id = req.params.id
        let nome = req.body.nome
        let requisitos = req.body.requisitos
        let valor = req.body.valor
        let formas_pagamento = req.body.formas_pagamento

        if (id && nome && requisitos && valor && formas_pagamento) {
            await ServicoService.alterar(id, nome, requisitos, valor, formas_pagamento);
            json.result = {
                id,
                nome,
                requisitos,
                valor,
                formas_pagamento
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },
    excluir: async(req, res)=>{
        let json = {error: '', result: {}};
        await ServicoService.excluir(req.params.id);

        res.json(json);
    }
}